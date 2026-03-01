import { useRef, useEffect, useState, useCallback } from "react";
import { AREAS, type AreaId } from "./data";
import { useActiveArea } from "./hooks/use-hover-state";
import { useBlurAnimation, ANIMATION_COMPLETE_THRESHOLD } from "./hooks/use-blur-animation";
import { AreasGeometry } from "./components/areas-geometry";
import { AreaContent } from "./components/area-content";
import { ViewModeToggle } from "./components/view-mode-toggle";
import { TextView } from "./components/text-view";
import styles from "./diagram.module.scss";

type ViewMode = "graphic" | "text";

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
    const [viewMode, setViewMode] = useState<ViewMode>("graphic");

    const { sortId, scaleId, handleMouseEnter, handleMouseLeave, lockArea, unlockArea, deactivateArea, cancelLeave } = useActiveArea();

    const toggleViewMode = useCallback(() => {
        setViewMode(prev => prev === "graphic" ? "text" : "graphic");
        setExpandedTopic(null);
        deactivateArea();
    }, [deactivateArea]);
    const { triggerBlur, isAnimationComplete } = useBlurAnimation(containerRef, blurRef);

    // Keep ref in sync with state to avoid stale closures
    useEffect(() => {
        isAnimationCompleteRef.current = isAnimationComplete;
    }, [isAnimationComplete]);

    // Helper to check if animation is complete based on current scroll position
    // This avoids race conditions with async state updates
    const checkAnimationComplete = useCallback((): boolean => {
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
    }, []);

    const onAreaEnter = useCallback((id: AreaId) => {
        const isComplete = checkAnimationComplete();
        if (id && isComplete) handleMouseEnter(id, triggerBlur);
    }, [checkAnimationComplete, handleMouseEnter, triggerBlur]);

    const handleTopicToggle = useCallback((areaId: AreaId, topicIndex: number) => {
        // Toggle: if same topic clicked, collapse; otherwise expand new one
        if (expandedTopic?.areaId === areaId && expandedTopic?.topicIndex === topicIndex) {
            setExpandedTopic(null);
            unlockArea();
        } else {
            setExpandedTopic({ areaId, topicIndex });
            lockArea();
        }
    }, [expandedTopic, lockArea, unlockArea]);

    const handleClosePopup = useCallback(() => {
        setExpandedTopic(null);
        unlockArea();
    }, [unlockArea]);

    /** Fully resets the diagram: closes popup and deactivates active area */
    const handleBackToMain = useCallback(() => {
        setExpandedTopic(null);
        deactivateArea();
    }, [deactivateArea]);

    const isGraphic = viewMode === "graphic";

    return (
        <div className={styles.diagramWrapper}>
            <div className={styles.toolbar}>
                <ViewModeToggle mode={viewMode} onToggle={toggleViewMode} />
            </div>

            {isGraphic ? (
                <>
                    <button
                        type="button"
                        className={`${styles.backButton} ${scaleId ? styles.backButtonVisible : ""}`}
                        onClick={handleBackToMain}
                        onMouseEnter={cancelLeave}
                        aria-label="Back to main view"
                    >
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M21 12H3M3 12L10 5M3 12L10 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div
                        ref={containerRef}
                        className={styles.diagram}
                        style={
                            {
                                "--animation-complete-threshold": `${ANIMATION_COMPLETE_THRESHOLD * 100}%`,
                            } as React.CSSProperties
                        }
                    >
                        <AreasGeometry
                            areas={AREAS}
                            scaleId={scaleId}
                            sortId={sortId}
                            blurRef={blurRef}
                            onMouseEnter={onAreaEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                        <AreaContent
                            areas={AREAS}
                            scaleId={scaleId}
                            expandedTopic={expandedTopic}
                            containerRef={containerRef}
                            diagramRef={containerRef}
                            onMouseEnter={(id: AreaId) => checkAnimationComplete() && handleMouseEnter(id, triggerBlur)}
                            onMouseLeave={handleMouseLeave}
                            onTopicToggle={handleTopicToggle}
                            onClosePopup={handleClosePopup}
                        />
                    </div>
                </>
            ) : (
                <TextView areas={AREAS} />
            )}
        </div>
    );
}
