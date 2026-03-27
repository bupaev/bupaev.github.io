import type { RefObject } from "react";
import type { AreaData, AreaId } from "../data";
import styles from "./areas-geometry.module.scss";

/** Maps area id to its CSS fill class */
const AREA_CLASS_MAP: Record<AreaId, string> = {
    topLeft: styles.areaTopLeft,
    topRight: styles.areaTopRight,
    bottomLeft: styles.areaBottomLeft,
    bottomRight: styles.areaBottomRight,
};

type AreasGeometryProps = {
    areas: AreaData[];
    scaleId: AreaId | null;
    sortId: AreaId | null;
    blurRef: RefObject<SVGFEGaussianBlurElement | null>;
    onMouseEnter: (id: AreaId) => void;
    onMouseLeave: () => void;
};

function getTransform(id: AreaId, cx: number, cy: number, scaleX: number, scaleY: number, scaleId: AreaId | null) {
    if (id === scaleId) {
        const tx = 400 - cx;
        const ty = 250 - cy;
        return `translate(${tx}px, ${ty}px) scale(${scaleX}, ${scaleY})`;
    }
    return "translate(0px, 0px) scale(1, 1)";
}

export function AreasGeometry({ areas, scaleId, sortId, blurRef, onMouseEnter, onMouseLeave }: AreasGeometryProps) {
    // Render the active (sorted) area last so it appears on top
    const otherAreas = areas.filter((p) => p.id !== sortId);
    const activeArea = areas.find((p) => p.id === sortId);
    const renderOrder = activeArea ? [...otherAreas, activeArea] : areas;
    const isSvgPerformanceLimited = typeof document !== "undefined" && document.documentElement.hasAttribute("data-low-perf");

    return (
        <svg
            className={styles.gooSvg}
            viewBox="0 0 800 500"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                <filter id="goo">
                    <feGaussianBlur
                        ref={blurRef}
                        in="SourceGraphic"
                        stdDeviation="20"
                        result="blur"
                    />
                    <feColorMatrix
                        in="blur"
                        type="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -18"
                    />
                </filter>
            </defs>

            <g filter="url(#goo)">
                {renderOrder.map((area) => (
                    <g
                        key={area.id}
                        style={{
                            transformBox: "view-box",
                            transformOrigin: `${area.cx}px ${area.cy}px`,
                            transform: getTransform(area.id, area.cx, area.cy, area.scaleX, area.scaleY, scaleId),
                            transition: isSvgPerformanceLimited ? "none" : "transform 500ms ease",
                            pointerEvents: "none",
                        }}
                    >
                        <polygon
                            className={AREA_CLASS_MAP[area.id]}
                            points={area.points}
                            style={{ pointerEvents: "none" }}
                        />
                    </g>
                ))}
            </g>
            
            <g>
                {renderOrder.map((area) => (
                    <g key={`hit-${area.id}`}>
                        <polygon
                            className={AREA_CLASS_MAP[area.id]}
                            points={area.hitPoints || area.points}
                            style={{ cursor: "pointer", fill: "transparent", pointerEvents: "all" }}
                            onMouseEnter={() => onMouseEnter(area.id)}
                            onMouseLeave={onMouseLeave}
                        />
                    </g>
                ))}
            </g>
        </svg>
    );
}
