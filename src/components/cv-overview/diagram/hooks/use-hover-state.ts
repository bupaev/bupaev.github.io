import { useRef, useState, useCallback } from "react";
import type { AreaId } from "../data";

/**
 * Manages active area state for the diagram with a lock mechanism.
 *
 * Uses two separate IDs to prevent animation jank:
 * - sortId: Controls DOM order (z-index in SVG) — changes immediately
 * - scaleId: Controls scale animation — changes after DOM reordering completes
 *
 * SVG doesn't support CSS z-index, so we must reorder DOM elements.
 * The double RAF ensures DOM reordering completes before animation starts.
 *
 * Lock mechanism: when a topic popup is open, the area is "locked" so
 * mouse leave/enter events don't change the active area.
 */
export function useActiveArea() {
    const [sortId, setSortId] = useState<AreaId | null>(null);
    const [scaleId, setScaleId] = useState<AreaId | null>(null);
    const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lockedRef = useRef(false);

    const handleMouseEnter = useCallback((id: AreaId, onEnter?: () => void) => {
        if (lockedRef.current) return;

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
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (lockedRef.current) return;

        leaveTimeoutRef.current = setTimeout(() => {
            // Step 1: Animate scale down
            setScaleId(null);

            // Step 2: After animation completes (500ms), restore DOM order
            setTimeout(() => {
                setSortId(null);
            }, 500);
        }, 100);
    }, []);

    /** Lock the current area so mouse events don't change it (popup open) */
    const lockArea = useCallback(() => {
        lockedRef.current = true;
        // Clear any pending leave timeout that might be in flight
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
            leaveTimeoutRef.current = null;
        }
    }, []);

    /** Unlock the area but keep it active (popup close) */
    const unlockArea = useCallback(() => {
        lockedRef.current = false;
    }, []);

    /** Cancel any pending leave timeout without side-effects */
    const cancelLeave = useCallback(() => {
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
            leaveTimeoutRef.current = null;
        }
    }, []);

    /**
     * Fully deactivate: clear timeouts, reset both IDs, and briefly lock
     * to prevent immediate re-activation when the back button disappears
     * and exposes the area polygon underneath.
     */
    const deactivateArea = useCallback(() => {
        lockedRef.current = true;

        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
            leaveTimeoutRef.current = null;
        }

        setScaleId(null);

        setTimeout(() => {
            setSortId(null);
            lockedRef.current = false;
        }, 500);
    }, []);

    return { sortId, scaleId, handleMouseEnter, handleMouseLeave, lockArea, unlockArea, deactivateArea, cancelLeave };
}
