import { useEffect, useRef, useState } from "react";

// Threshold (0-1) where the scroll-driven animation is considered complete.
// At this point:
// 1. The CSS animation finishes (matches `animation-range: cover 50%`)
// 2. The blur filter transitions to a stronger value for the full "gooey" effect (static state)
// 3. User interactions (hover effects) are enabled
export const ANIMATION_COMPLETE_THRESHOLD = 0.6;

// Low blur stdDeviation used during animation.
// A smaller radius reduces the rendering cost of the filter, ensuring smooth 60fps scrolling.
const STD_DEV_LOW = 20;

// High blur stdDeviation used when static.
// A larger radius creates a smoother, more liquid-like merger between shapes (maximal "gooey" effect),
// but is too computationally expensive to render during animation.
const STD_DEV_HIGH = 100;

// Duration (ms) for the smooth transition between blur levels.
const TRANSITION_DURATION = 1000;

/**
 * Animates SVG Gaussian blur stdDeviation based on scroll position.
 * Uses IntersectionObserver to only track scroll when visible.
 */
export function useBlurAnimation(
    containerRef: React.RefObject<HTMLDivElement | null>,
    blurRef: React.RefObject<SVGFEGaussianBlurElement | null>,
) {
    const currentBlurRef = useRef(STD_DEV_LOW);
    const targetBlurRef = useRef(STD_DEV_LOW);
    const rafRef = useRef<number | null>(null);

    const startTransition = () => {
        if (rafRef.current !== null) return;

        let startTime: number | null = null;
        const startVal = currentBlurRef.current;
        const endVal = targetBlurRef.current;
        const blur = blurRef.current;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const t = Math.min(1, elapsed / TRANSITION_DURATION);
            const easeT = 1 - Math.pow(1 - t, 3);

            const currentVal = startVal + (endVal - startVal) * easeT;
            currentBlurRef.current = currentVal;
            if (blur) {
                blur.setAttribute("stdDeviation", String(currentVal));
            }

            if (t < 1) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                rafRef.current = null;
            }
        };

        rafRef.current = requestAnimationFrame(animate);
    };

    const [isAnimationComplete, setIsAnimationComplete] = useState(false);

    /** Trigger blur transition manually (e.g. on hover) */
    const triggerBlur = () => {
        startTransition();
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let isVisible = false;

        const updateBlur = () => {
            if (!isVisible) return;

            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const totalDistance = viewportHeight + rect.height;
            const distanceTraveled = viewportHeight - rect.top;
            const progress = Math.max(0, Math.min(1, distanceTraveled / totalDistance));

            // Use functional state updates to avoid stale closure issues
            setIsAnimationComplete((prev) => {
                const shouldBeComplete = progress >= ANIMATION_COMPLETE_THRESHOLD;
                return shouldBeComplete !== prev ? shouldBeComplete : prev;
            });

            const desiredBlur = progress >= ANIMATION_COMPLETE_THRESHOLD ? STD_DEV_HIGH : STD_DEV_LOW;

            if (targetBlurRef.current !== desiredBlur) {
                targetBlurRef.current = desiredBlur;
                if (rafRef.current !== null) {
                    cancelAnimationFrame(rafRef.current);
                    rafRef.current = null;
                }
                startTransition();
            }
        };

        const handleScroll = () => {
            updateBlur();
        };

        const observer = new IntersectionObserver(
            (entries) => {
                isVisible = entries[0].isIntersecting;
                if (isVisible) {
                    window.addEventListener("scroll", handleScroll, { passive: true });
                    updateBlur();
                } else {
                    window.removeEventListener("scroll", handleScroll);
                }
            },
            { threshold: 0 },
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, [containerRef, blurRef]);

    return { triggerBlur, isAnimationComplete };
}
