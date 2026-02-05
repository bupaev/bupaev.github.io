import type { RefObject } from "react";
import type { PolygonData, PolygonId } from "../data";
import styles from "./polygons-layer.module.scss";

/** Maps polygon id to its CSS fill class */
const AREA_CLASS_MAP: Record<PolygonId, string> = {
    topLeft: styles.areaTopLeft,
    topRight: styles.areaTopRight,
    bottomLeft: styles.areaBottomLeft,
    bottomRight: styles.areaBottomRight,
};

type PolygonsLayerProps = {
    polygons: PolygonData[];
    scaleId: PolygonId | null;
    sortId: PolygonId | null;
    blurRef: RefObject<SVGFEGaussianBlurElement | null>;
    onMouseEnter: (id: PolygonId) => void;
    onMouseLeave: () => void;
};

function getTransform(id: PolygonId, cx: number, cy: number, scaleX: number, scaleY: number, scaleId: PolygonId | null) {
    if (id === scaleId) {
        const tx = 400 - cx;
        const ty = 250 - cy;
        return `translate(${tx}px, ${ty}px) scale(${scaleX}, ${scaleY})`;
    }
    return "translate(0px, 0px) scale(1, 1)";
}

export function PolygonsLayer({ polygons, scaleId, sortId, blurRef, onMouseEnter, onMouseLeave }: PolygonsLayerProps) {
    // Render the active (sorted) polygon last so it appears on top
    const otherPolygons = polygons.filter((p) => p.id !== sortId);
    const activePolygon = polygons.find((p) => p.id === sortId);
    const renderOrder = activePolygon ? [...otherPolygons, activePolygon] : polygons;

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
                {renderOrder.map((polygon) => (
                    <g
                        key={polygon.id}
                        style={{
                            transformBox: "view-box",
                            transformOrigin: `${polygon.cx}px ${polygon.cy}px`,
                            transform: getTransform(polygon.id, polygon.cx, polygon.cy, polygon.scaleX, polygon.scaleY, scaleId),
                            transition: "transform 500ms ease",
                        }}
                    >
                        <polygon
                            className={AREA_CLASS_MAP[polygon.id]}
                            points={polygon.points}
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() => onMouseEnter(polygon.id)}
                            onMouseLeave={onMouseLeave}
                        />
                    </g>
                ))}
            </g>
        </svg>
    );
}
