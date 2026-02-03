import { useState } from "react";
import type { PolygonData, PolygonId } from "../data";
import styles from "./labels-layer.module.scss";

// Base dimensions of the diagram container (SVG viewport size)
const CONTAINER_WIDTH = 800;
const CONTAINER_HEIGHT = 500;

// Center coordinates derived from container dimensions
const CONTAINER_CENTER_X = CONTAINER_WIDTH / 2;
const CONTAINER_CENTER_Y = CONTAINER_HEIGHT / 2 - CONTAINER_HEIGHT / 20;

// Coordinate used to move the mouse position effectively "off-screen" when the mouse leaves the container
const MOUSE_OFF_SCREEN_COORD = Math.max(CONTAINER_WIDTH, CONTAINER_HEIGHT) * 20;

// Horizontal radius for the elliptical distribution of keywords (30% of container width)
const KEYWORD_DISTRIBUTION_RADIUS_X = CONTAINER_WIDTH * 0.3;

// Vertical radius for the elliptical distribution of keywords (40% of container height)
const KEYWORD_DISTRIBUTION_RADIUS_Y = CONTAINER_HEIGHT * 0.3;

// Maximum distance from cursor for magnification effect (30% of container height)
const MOUSE_PROXIMITY_THRESHOLD = CONTAINER_HEIGHT * 0.3;

// Maximum scale factor applied to a keyword when the mouse is directly over it
const KEYWORD_MAX_SCALE = 1.2;

// Base scale factor for keywords when getting far from the mouse
const KEYWORD_MIN_SCALE = 1;

// Scale threshold at which a keyword is brought to the front (z-index boost)
const KEYWORD_Z_INDEX_THRESHOLD = 1.1;

// Z-index for keywords that are magnified/active
const Z_INDEX_ACTIVE = 10;

// Z-index for keywords in their normal state
const Z_INDEX_NORMAL = 1;

/** Maps polygon id to its label entrance animation class */
const LABEL_CLASS_MAP: Record<PolygonId, string> = {
    topLeft: styles.labelTopLeft,
    topRight: styles.labelTopRight,
    bottomLeft: styles.labelBottomLeft,
    bottomRight: styles.labelBottomRight,
};

type LabelsLayerProps = {
    polygons: PolygonData[];
    scaleId: PolygonId | null;
    containerRef: React.RefObject<HTMLDivElement | null>;
    onMouseEnter: (id: PolygonId) => void;
    onMouseLeave: () => void;
};

export function LabelsLayer({ polygons, scaleId, containerRef, onMouseEnter, onMouseLeave }: LabelsLayerProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - CONTAINER_CENTER_X;
        const y = e.clientY - rect.top - CONTAINER_CENTER_Y;
        setMousePos({ x, y });
    };

    return (
        <div
            className={styles.labels}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: MOUSE_OFF_SCREEN_COORD, y: MOUSE_OFF_SCREEN_COORD })}
            style={
                {
                    "--center-x": `${CONTAINER_CENTER_X}px`,
                    "--center-y": `${CONTAINER_CENTER_Y}px`,
                } as React.CSSProperties
            }
        >
            {polygons.map((polygon) => {
                const isHovered = scaleId === polygon.id;
                const isAnyHovered = scaleId !== null;
                const isOtherHovered = isAnyHovered && !isHovered;

                return (
                    <div
                        key={polygon.id}
                        className={`${styles.areaLabelContainer} ${isHovered ? styles.active : ""
                            } ${isOtherHovered ? styles.inactive : ""}`}
                        style={
                            {
                                "--cx": `${polygon.cx}px`,
                                "--cy": `${polygon.cy}px`,
                            } as React.CSSProperties
                        }
                        onMouseEnter={() => onMouseEnter(polygon.id)}
                        onMouseLeave={onMouseLeave}
                    >
                        <span className={`${styles.areaLabel} ${LABEL_CLASS_MAP[polygon.id]}`}>
                            {polygon.label}
                        </span>

                        <div className={styles.keywords}>
                            {polygon.keywords.map((keyword, i) => {
                                const total = polygon.keywords.length;
                                const angle = -Math.PI / 2 + (2 * Math.PI * i) / total;
                                const kx = Math.cos(angle) * KEYWORD_DISTRIBUTION_RADIUS_X;
                                const ky = Math.sin(angle) * KEYWORD_DISTRIBUTION_RADIUS_Y;

                                const dist = Math.sqrt(Math.pow(mousePos.x - kx, 2) + Math.pow(mousePos.y - ky, 2));

                                let scale = KEYWORD_MIN_SCALE;
                                if (dist < MOUSE_PROXIMITY_THRESHOLD) {
                                    scale = KEYWORD_MIN_SCALE + (KEYWORD_MAX_SCALE - KEYWORD_MIN_SCALE) * (1 - dist / MOUSE_PROXIMITY_THRESHOLD);
                                }

                                return (
                                    <span
                                        key={i}
                                        className={styles.keyword}
                                        style={{
                                            transform: `translate(calc(-50% + ${kx}px), calc(-50% + ${ky}px)) scale(${scale})`,
                                            zIndex: scale > KEYWORD_Z_INDEX_THRESHOLD ? Z_INDEX_ACTIVE : Z_INDEX_NORMAL,
                                        }}
                                    >
                                        {keyword}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
