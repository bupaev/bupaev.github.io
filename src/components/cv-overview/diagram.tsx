import { useEffect, useRef } from "react";
import styles from "./diagram.module.scss";

/** Blur animation range matching CSS animation-range: cover 10% cover 60% */
const ANIMATION_START = 0.1; // 10% of view progress
const ANIMATION_END = 0.6; // 60% of view progress
const STD_DEV_START = 10;
const STD_DEV_END = 100;

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

    useEffect(() => {
        const container = containerRef.current;
        const blur = blurRef.current;
        if (!container || !blur) return;

        let rafId: number | null = null;
        let isVisible = false;

        /**
         * Calculate scroll progress matching CSS animation-timeline: view()
         * Progress: 0 = element just entering viewport, 1 = element fully left viewport
         */
        const updateBlur = () => {
            if (!isVisible) return;

            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate "cover" progress: 0 when top enters bottom, 1 when bottom exits top
            const totalDistance = viewportHeight + rect.height;
            const distanceTraveled = viewportHeight - rect.top;
            const progress = Math.max(0, Math.min(1, distanceTraveled / totalDistance));

            // Map progress from [ANIMATION_START, ANIMATION_END] to [0, 1]
            const animationProgress = Math.max(
                0,
                Math.min(1, (progress - ANIMATION_START) / (ANIMATION_END - ANIMATION_START))
            );

            // Interpolate stdDeviation from 100 to 10
            const stdDev = STD_DEV_START - animationProgress * (STD_DEV_START - STD_DEV_END);
            blur.setAttribute("stdDeviation", String(stdDev));
        };

        const handleScroll = () => {
            if (rafId !== null) return; // Throttle with rAF
            rafId = requestAnimationFrame(() => {
                updateBlur();
                rafId = null;
            });
        };

        // Only attach scroll listener when element is visible (performance optimization)
        const observer = new IntersectionObserver(
            (entries) => {
                isVisible = entries[0].isIntersecting;
                if (isVisible) {
                    window.addEventListener("scroll", handleScroll, { passive: true });
                    updateBlur(); // Initial update
                } else {
                    window.removeEventListener("scroll", handleScroll);
                }
            },
            { threshold: 0 }
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div ref={containerRef} className={styles.diagram}>
            {/* SVG with native elements - filter applied via attribute for Safari compatibility */}
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
                            stdDeviation="100"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            type="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -18"
                        />
                    </filter>
                </defs>

                {/* Apply filter to group via attribute - works in Safari with animations */}
                {/* <g filter="url(#goo)"></g> */}
                <g filter="url(#goo)">
                    {/* Front-end engineering - top-left parallelogram */}
                    <polygon
                        className={styles.areaTopLeft}
                        points="80,0 535,0 463,288 8,288"
                    />
                    {/* Leadership - top-right parallelogram */}
                    <polygon
                        className={styles.areaTopRight}
                        points="526,35 800,35 737,288 464,288"
                    />
                    {/* UI/UX Design - bottom-left parallelogram */}
                    <polygon
                        className={styles.areaBottomLeft}
                        points="52,288 463,288 411,500 0,500"
                    />
                    {/* AI expertize - bottom-right parallelogram */}
                    <polygon
                        className={styles.areaBottomRight}
                        points="459,288 709,288 660,481 411,481"
                    />
                </g>
            </svg>


            {/* Labels positioned outside SVG for sharp text */}
            <div className={styles.labels}>
                <span className={`${styles.areaLabel} ${styles.labelTopLeft}`}>
                    Front-end
                    <br />
                    engineering
                </span>
                <span className={`${styles.areaLabel} ${styles.labelTopRight}`}>
                    Leadership
                </span>
                <span className={`${styles.areaLabel} ${styles.labelBottomLeft}`}>
                    UI/UX Design
                </span>
                <span className={`${styles.areaLabel} ${styles.labelBottomRight}`}>
                    AI expertize
                </span>
            </div>
        </div>
    );
}
