import { useState } from "react";
import type { PolygonData, PolygonId } from "../data";
import styles from "./labels-layer.module.scss";

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
        const x = e.clientX - rect.left - 400;
        const y = e.clientY - rect.top - 250;
        setMousePos({ x, y });
    };

    return (
        <div
            className={styles.labels}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 9999, y: 9999 })}
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
                                const rx = 240;
                                const ry = 200;
                                const angle = -Math.PI / 2 + (2 * Math.PI * i) / total;
                                const kx = Math.cos(angle) * rx;
                                const ky = Math.sin(angle) * ry;

                                const dist = Math.sqrt(Math.pow(mousePos.x - kx, 2) + Math.pow(mousePos.y - ky, 2));

                                const MAX_DIST = 150;
                                const MAX_SCALE = 1.4;
                                const MIN_SCALE = 1;

                                let scale = MIN_SCALE;
                                if (dist < MAX_DIST) {
                                    scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * (1 - dist / MAX_DIST);
                                }

                                return (
                                    <span
                                        key={i}
                                        className={styles.keyword}
                                        style={{
                                            transform: `translate(calc(-50% + ${kx}px), calc(-50% + ${ky}px)) scale(${scale})`,
                                            zIndex: scale > 1.1 ? 10 : 1,
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
