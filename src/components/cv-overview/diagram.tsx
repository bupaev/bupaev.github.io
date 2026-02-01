import { useEffect, useRef, useState } from "react";
import styles from "./diagram.module.scss";

/** Blur animation range matching CSS animation-range: cover 10% cover 60% */

const ANIMATION_END = 0.5; // Trigger early (vs CSS 60%) to overlap with ease-out tail
const STD_DEV_LOW = 20;
const STD_DEV_HIGH = 100;

/** Polygon data for the four skill areas */
const POLYGONS = [
    {
        id: "topLeft",
        className: styles.areaTopLeft,
        points: "80,0 535,0 463,288 8,288",
        scaleX: 1.52,
        scaleY: 1.74,
        cx: 271,
        cy: 144,
        label: (
            <>
                Front-end
                <br />
                engineering
            </>
        ),
        labelClass: styles.labelTopLeft,
        keywords: [
            "Scalable SPA Architecture",
            "Legacy System Modernization",
            "Performance Engineering",
            "Code Quality Guardian",
            "Modern JavaScript Ecosystem",
            "Strive to good DX",
        ],
    },
    {
        id: "topRight",
        className: styles.areaTopRight,
        points: "526,35 800,35 737,288 464,288",
        scaleX: 2.38,
        scaleY: 1.98,
        cx: 632,
        cy: 162,
        label: <>Leadership</>,
        labelClass: styles.labelTopRight,
        keywords: [
            "Technical Orchestrator",
            "Engineering Culture Architect",
            "Cross-Functional Influence",
            "Crisis Management",
            "Trust-Based Mentorship",
        ],
    },
    {
        id: "bottomLeft",
        className: styles.areaBottomLeft,
        points: "52,288 463,288 411,500 0,500",
        scaleX: 1.73,
        scaleY: 2.36,
        cx: 232,
        cy: 394,
        label: <>UI/UX Design</>,
        labelClass: styles.labelBottomLeft,
        keywords: [
            "UX/Engineering Bridge",
            "Reasonable Perfectionist",
            "Accessibility (WCAG) Advocate",
            "Design Systems Integration",
            "Human-Centric Interface Design",
        ],
    },
    {
        id: "bottomRight",
        className: styles.areaBottomRight,
        points: "459,288 709,288 660,481 411,481",
        scaleX: 2.68,
        scaleY: 2.59,
        cx: 560,
        cy: 385,
        label: <>AI expertize</>,
        labelClass: styles.labelBottomRight,
        keywords: [
            "High-Leverage Engineer",
            "Critical Systems Thinker",
            "GenAI Pair Programming",
            "AI Output Validation",
        ],
    },
] as const;

type PolygonId = (typeof POLYGONS)[number]["id"] | null;

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
    const [sortId, setSortId] = useState<PolygonId>(null);
    const [scaleId, setScaleId] = useState<PolygonId>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (id: PolygonId) => {
        // Clear any pending leave actions (both scale and sort)
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

        // Small delay to ensure DOM reorder happens before scale transition starts
        requestAnimationFrame(() => {
            startBlurTransition(); // Ensure blur is robustly triggered
            setScaleId(id);
        });
    };

    const handleMouseLeave = () => {
        // Small delay to allow moving between polygon and keywords without losing state
        leaveTimeoutRef.current = setTimeout(() => {
            setScaleId(null);

            // Sequence: 1. Scale down, 2. Restore Z-index
            hoverTimeoutRef.current = setTimeout(() => {
                setSortId(null);
            }, 200); // Wait for transition duration (200ms)
        }, 100);
    };

    // Track blur values to avoid unnecessary DOM updates and manage transitions
    const currentBlurRef = useRef(STD_DEV_LOW);
    const targetBlurRef = useRef(STD_DEV_LOW);
    const rafRef = useRef<number | null>(null);

    const startBlurTransition = () => {
        if (rafRef.current !== null) return; // Animation already running

        let startTime: number | null = null;
        const startVal = currentBlurRef.current;
        const endVal = targetBlurRef.current;
        const duration = 1000; // transition time in ms
        const blur = blurRef.current;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const t = Math.min(1, elapsed / duration);

            // Ease-out cubic
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

            const desiredBlur = progress >= ANIMATION_END ? STD_DEV_HIGH : STD_DEV_LOW;

            if (targetBlurRef.current !== desiredBlur) {
                targetBlurRef.current = desiredBlur;
                if (rafRef.current !== null) {
                    cancelAnimationFrame(rafRef.current);
                    rafRef.current = null;
                }
                startBlurTransition();
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
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Sort polygons so the hovered one is rendered last (on top)
    const sortedPolygons = [...POLYGONS].sort((a, b) => {
        if (a.id === sortId) return 1;
        if (b.id === sortId) return -1;
        return 0; // Maintain order for non-hovered items
    });

    const getTransform = (id: string, cx: number, cy: number, scaleX: number, scaleY: number) => {
        if (id === scaleId) {
            const tx = 400 - cx;
            const ty = 250 - cy;
            return `translate(${tx}px, ${ty}px) scale(${scaleX}, ${scaleY})`;
        }
        return "translate(0px, 0px) scale(1, 1)";
    };

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        // 0,0 at center of 800x500 container
        const x = e.clientX - rect.left - 400;
        const y = e.clientY - rect.top - 250;


        setMousePos({ x, y });
    };

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

                {/* MERGED LAYER: Visuals + Interaction */}
                <g filter="url(#goo)">
                    {sortedPolygons.map((polygon) => (
                        <g
                            key={polygon.id}
                            style={{
                                transformBox: "view-box",
                                transformOrigin: `${polygon.cx}px ${polygon.cy}px`,
                                transform: getTransform(
                                    polygon.id,
                                    polygon.cx,
                                    polygon.cy,
                                    polygon.scaleX,
                                    polygon.scaleY
                                ),
                                transition: "transform 200ms ease",
                            }}
                        >
                            <polygon
                                className={polygon.className}
                                points={polygon.points}
                                style={{ cursor: "pointer" }}
                                onMouseEnter={() => handleMouseEnter(polygon.id)}
                                onMouseLeave={handleMouseLeave}
                            />
                        </g>
                    ))}
                </g>
            </svg>

            {/* Labels overlay */}
            <div
                className={styles.labels}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setMousePos({ x: 9999, y: 9999 })} // Reset effectively
            >
                {POLYGONS.map((polygon) => {
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
                            onMouseEnter={() => handleMouseEnter(polygon.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span className={`${styles.areaLabel} ${polygon.labelClass}`}>
                                {polygon.label}
                            </span>

                            {/* Keywords List - Only visible when hovered */}
                            <div className={styles.keywords}>
                                {polygon.keywords.map((keyword, i) => {
                                    const total = polygon.keywords.length;
                                    // Ellipse parameters corresponding to 600x350 container (approx) or adjusted visual fit
                                    const rx = 240; // Horizontal radius
                                    const ry = 200; // Vertical radius

                                    // Distribute starting from -PI/2 (top)
                                    // angle = -PI/2 + (2 * PI * i) / total
                                    const angle = -Math.PI / 2 + (2 * Math.PI * i) / total;

                                    const kx = Math.cos(angle) * rx;
                                    const ky = Math.sin(angle) * ry;

                                    // Calculate distance from mouse to this keyword center
                                    const dist = Math.sqrt(Math.pow(mousePos.x - kx, 2) + Math.pow(mousePos.y - ky, 2));

                                    // Magnification logic
                                    const MAX_DIST = 150;
                                    const MAX_SCALE = 1.6;
                                    const MIN_SCALE = 1;

                                    let scale = MIN_SCALE;
                                    if (dist < MAX_DIST) {
                                        scale =
                                            MIN_SCALE +
                                            (MAX_SCALE - MIN_SCALE) *
                                            (1 - dist / MAX_DIST);
                                    }

                                    return (
                                        <span
                                            key={i}
                                            className={styles.keyword}
                                            style={{
                                                transform: `translate(calc(-50% + ${kx}px), calc(-50% + ${ky}px)) scale(${scale})`,
                                                zIndex: scale > 1.1 ? 10 : 1, // Bring magnified items to front
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
        </div>
    );
}
