import { useRef, useState } from "react";
import type { AreaId } from "../data";

/**
 * Manages hover state for diagram areas.
 * 
 * Uses two separate IDs to prevent animation jank:
 * - sortId: Controls DOM order (z-index in SVG) - changes immediately
 * - scaleId: Controls scale animation - changes after DOM reordering completes
 * 
 * SVG doesn't support CSS z-index, so we must reorder DOM elements.
 * The double RAF ensures DOM reordering completes before animation starts.
 */
export function useHoverState() {
    const [sortId, setSortId] = useState<AreaId | null>(null);
    const [scaleId, setScaleId] = useState<AreaId | null>(null);
    const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (id: AreaId, onEnter?: () => void) => {
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
            leaveTimeoutRef.current = null;
        }

        // Step 1: Reorder DOM (bring hovered area to top)
        setSortId(id);

        // Step 2: Wait for DOM reordering to complete, then trigger animation
        // Double RAF ensures: 1st RAF = after React commit, 2nd RAF = after browser paint
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                onEnter?.();
                setScaleId(id);
            });
        });
    };

    const handleMouseLeave = () => {
        leaveTimeoutRef.current = setTimeout(() => {
            // Step 1: Animate scale down
            setScaleId(null);

            // Step 2: After animation completes (500ms), restore DOM order
            setTimeout(() => {
                setSortId(null);
            }, 500);
        }, 100);
    };

    return { sortId, scaleId, handleMouseEnter, handleMouseLeave };
}
