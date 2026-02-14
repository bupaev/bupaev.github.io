import { useRef, useEffect, useState } from "react";
import { AREAS, type AreaId } from "./diagram/data";
import { useHoverState } from "./diagram/hooks/use-hover-state";
import { useBlurAnimation, ANIMATION_COMPLETE_THRESHOLD } from "./diagram/hooks/use-blur-animation";
import { AreasGeometry } from "./diagram/components/areas-geometry";
import { AreaContent } from "./diagram/components/area-content";
import styles from "./diagram.module.scss";

/** Tracks which topic is expanded: area ID and topic index */
type ExpandedTopic = {
    areaId: AreaId;
    topicIndex: number;
} | null;

/**
 * Diagram component displaying four overlapping skill areas
 * with a gooey color transition effect creating a blob-like appearance.
 * Uses native SVG elements instead of HTML divs for Safari CSS animation compatibility.
 * Headings and topics are positioned outside the SVG to prevent blur from the filter.
 * Blur filter stdDeviation is animated via JS to sync with scroll-driven CSS animations.
 */
export function Diagram() {
    const containerRef = useRef<HTMLDivElement>(null);
    const blurRef = useRef<SVGFEGaussianBlurElement>(null);
    const isAnimationCompleteRef = useRef(false);
    const [expandedTopic, setExpandedTopic] = useState<ExpandedTopic>(null);

    const { sortId, scaleId, handleMouseEnter, handleMouseLeave } = useHoverState();
    const { triggerBlur, isAnimationComplete } = useBlurAnimation(containerRef, blurRef);

    // Keep ref in sync with state to avoid stale closures
    useEffect(() => {
        isAnimationCompleteRef.current = isAnimationComplete;
    }, [isAnimationComplete]);

    // Helper to check if animation is complete based on current scroll position
    // This avoids race conditions with async state updates
    const checkAnimationComplete = (): boolean => {
        // First check the ref for the React state
        if (isAnimationCompleteRef.current) return true;

        // If state says not complete, double-check with DOM measurement
        // This handles cases where scroll happened but React hasn't re-rendered yet
        const container = containerRef.current;
        if (!container) return false;

        const rect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const totalDistance = viewportHeight + rect.height;
        const distanceTraveled = viewportHeight - rect.top;
        const progress = Math.max(0, Math.min(1, distanceTraveled / totalDistance));

        return progress >= ANIMATION_COMPLETE_THRESHOLD;
    };

    const onAreaEnter = (id: typeof sortId) => {
        const isComplete = checkAnimationComplete();
        if (id && isComplete) handleMouseEnter(id, triggerBlur);
    };

    const handleTopicToggle = (areaId: AreaId, topicIndex: number) => {
        // Toggle: if same topic clicked, collapse; otherwise expand new one
        if (expandedTopic?.areaId === areaId && expandedTopic?.topicIndex === topicIndex) {
            setExpandedTopic(null);
        } else {
            setExpandedTopic({ areaId, topicIndex });
        }
    };

    // Use expanded topic's area to keep it scaled when expanded
    const effectiveScaleId = expandedTopic ? expandedTopic.areaId : scaleId;
    const activeId = expandedTopic ? expandedTopic.areaId : sortId;

    return (
        <div
            ref={containerRef}
            className={styles.diagram}
            style={
                {
                    "--animation-complete-threshold": ANIMATION_COMPLETE_THRESHOLD,
                } as React.CSSProperties
            }
        >
            <AreasGeometry
                areas={AREAS}
                scaleId={effectiveScaleId}
                sortId={activeId}
                blurRef={blurRef}
                onMouseEnter={onAreaEnter}
                onMouseLeave={handleMouseLeave}
            />
            <AreaContent
                areas={AREAS}
                scaleId={effectiveScaleId}
                expandedTopic={expandedTopic}
                containerRef={containerRef}
                diagramRef={containerRef}
                onMouseEnter={(id: AreaId) => checkAnimationComplete() && handleMouseEnter(id, triggerBlur)}
                onMouseLeave={handleMouseLeave}
                onTopicToggle={handleTopicToggle}
            />
        </div>
    );
}
