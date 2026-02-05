import { useRef, useEffect, useState } from "react";
import { AREAS, type AreaId } from "./diagram/data";
import { useHoverState } from "./diagram/hooks/use-hover-state";
import { useBlurAnimation, ANIMATION_COMPLETE_THRESHOLD } from "./diagram/hooks/use-blur-animation";
import { AreasLayer } from "./diagram/components/areas-layer";
import { LabelsLayer } from "./diagram/components/labels-layer";
import styles from "./diagram.module.scss";

/** Tracks which keyword is expanded: area ID and keyword index */
type ExpandedKeyword = {
    areaId: AreaId;
    keywordIndex: number;
} | null;

/**
 * Diagram component displaying four overlapping skill areas
 * with a gooey color transition effect creating a blob-like appearance.
 * Uses native SVG elements instead of HTML divs for Safari CSS animation compatibility.
 * Labels are positioned outside the SVG to prevent blur from the filter.
 * Blur filter stdDeviation is animated via JS to sync with scroll-driven CSS animations.
 */
export function Diagram() {
    const containerRef = useRef<HTMLDivElement>(null);
    const blurRef = useRef<SVGFEGaussianBlurElement>(null);
    const isAnimationCompleteRef = useRef(false);
    const [expandedKeyword, setExpandedKeyword] = useState<ExpandedKeyword>(null);

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

    const handleKeywordToggle = (areaId: AreaId, keywordIndex: number) => {
        // Toggle: if same keyword clicked, collapse; otherwise expand new one
        if (expandedKeyword?.areaId === areaId && expandedKeyword?.keywordIndex === keywordIndex) {
            setExpandedKeyword(null);
        } else {
            setExpandedKeyword({ areaId, keywordIndex });
        }
    };

    // Use expanded keyword's area to keep it scaled when expanded
    const effectiveScaleId = expandedKeyword ? expandedKeyword.areaId : scaleId;
    const activeId = expandedKeyword ? expandedKeyword.areaId : sortId;

    return (
        <div ref={containerRef} className={styles.diagram}>
            <AreasLayer
                areas={AREAS}
                scaleId={effectiveScaleId}
                sortId={activeId}
                blurRef={blurRef}
                onMouseEnter={onAreaEnter}
                onMouseLeave={handleMouseLeave}
            />
            <LabelsLayer
                areas={AREAS}
                scaleId={effectiveScaleId}
                expandedKeyword={expandedKeyword}
                containerRef={containerRef}
                diagramRef={containerRef}
                onMouseEnter={(id: AreaId) => checkAnimationComplete() && handleMouseEnter(id, triggerBlur)}
                onMouseLeave={handleMouseLeave}
                onKeywordToggle={handleKeywordToggle}
            />
        </div>
    );
}
