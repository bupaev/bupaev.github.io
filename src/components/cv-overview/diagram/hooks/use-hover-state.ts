import { useRef, useState } from "react";
import type { PolygonId } from "../data";

/**
 * Manages hover state for diagram polygons with coordinated
 * z-index reordering (sortId) and scale animation (scaleId).
 */
export function useHoverState() {
    const [sortId, setSortId] = useState<PolygonId | null>(null);
    const [scaleId, setScaleId] = useState<PolygonId | null>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (id: PolygonId, onEnter?: () => void) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
            leaveTimeoutRef.current = null;
        }

        // Sequence: 1. Move to top (Z-index), 2. Scale up
        setSortId(id);

        requestAnimationFrame(() => {
            onEnter?.();
            setScaleId(id);
        });
    };

    const handleMouseLeave = () => {
        leaveTimeoutRef.current = setTimeout(() => {
            setScaleId(null);

            // Sequence: 1. Scale down, 2. Restore Z-index
            hoverTimeoutRef.current = setTimeout(() => {
                setSortId(null);
            }, 200);
        }, 100);
    };

    return { sortId, scaleId, handleMouseEnter, handleMouseLeave };
}
