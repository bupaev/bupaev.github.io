import { useRef } from "react";
import { POLYGONS } from "./diagram/data";
import { useHoverState } from "./diagram/hooks/use-hover-state";
import { useBlurAnimation } from "./diagram/hooks/use-blur-animation";
import { PolygonsLayer } from "./diagram/components/polygons-layer";
import { LabelsLayer } from "./diagram/components/labels-layer";
import styles from "./diagram.module.scss";

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

    const { sortId, scaleId, handleMouseEnter, handleMouseLeave } = useHoverState();
    const { triggerBlur } = useBlurAnimation(containerRef, blurRef);

    // Sort polygons so the hovered one is rendered last (on top)
    const sortedPolygons = [...POLYGONS].sort((a, b) => {
        if (a.id === sortId) return 1;
        if (b.id === sortId) return -1;
        return 0;
    });

    const onPolygonEnter = (id: typeof sortId) => {
        if (id) handleMouseEnter(id, triggerBlur);
    };

    return (
        <div ref={containerRef} className={styles.diagram}>
            <PolygonsLayer
                polygons={sortedPolygons}
                scaleId={scaleId}
                blurRef={blurRef}
                onMouseEnter={onPolygonEnter}
                onMouseLeave={handleMouseLeave}
            />
            <LabelsLayer
                polygons={POLYGONS}
                scaleId={scaleId}
                containerRef={containerRef}
                onMouseEnter={(id) => handleMouseEnter(id, triggerBlur)}
                onMouseLeave={handleMouseLeave}
            />
        </div>
    );
}
