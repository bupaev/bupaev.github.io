import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./diagram-graph.module.scss";

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
        label: ["Front-end", "engineering"],
        keywords: [
            "React",
            "Vue",
            "Angular",
            "TypeScript",
            "JavaScript",
            "HTML5",
            "CSS3",
            "SCSS",
            "Gatsby",
            "Web Audio API",
            "Responsive Design",
        ],
        labelClass: styles.labelTopLeft,
    },
    {
        id: "topRight",
        className: styles.areaTopRight,
        points: "526,35 800,35 737,288 464,288",
        scaleX: 2.38,
        scaleY: 1.98,
        cx: 632,
        cy: 162,
        label: ["Leadership"],
        keywords: [
            "Team Leading",
            "Mentoring",
            "Code Review",
            "Architecture",
            "Hiring",
            "Agile",
            "Scrum",
            "Process Optimization",
        ],
        labelClass: styles.labelTopRight,
    },
    {
        id: "bottomLeft",
        className: styles.areaBottomLeft,
        points: "52,288 463,288 411,500 0,500",
        scaleX: 1.73,
        scaleY: 2.36,
        cx: 232,
        cy: 394,
        label: ["UI/UX Design"],
        keywords: [
            "Figma",
            "User Research",
            "Prototyping",
            "Wireframing",
            "Accessibility",
            "Design Systems",
            "Interaction Design",
            "Visual Design",
        ],
        labelClass: styles.labelBottomLeft,
    },
    {
        id: "bottomRight",
        className: styles.areaBottomRight,
        points: "459,288 709,288 660,481 411,481",
        scaleX: 2.68,
        scaleY: 2.59,
        cx: 560,
        cy: 385,
        label: ["AI expertise"],
        keywords: [
            "AI Agents",
            "LLMs",
            "Prompt Engineering",
            "Python",
            "RAG",
            "AI Systems",
            "Control Theory",
            "Automation",
        ],
        labelClass: styles.labelBottomRight,
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

    const handleMouseEnter = (id: PolygonId) => {
        // Clear any pending leave actions
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }

        // Sequence: 1. Move to top (Z-index), 2. Scale up
        setSortId(id);

        // Small delay to ensure DOM reorder happens before scale transition starts
        // This prevents the "jump" effect
        requestAnimationFrame(() => {
            startBlurTransition(); // Ensure blur is robustly triggered
            setScaleId(id);
        });
    };

    const handleMouseLeave = () => {
        // Sequence: 1. Scale down, 2. Restore Z-index
        setScaleId(null);

        hoverTimeoutRef.current = setTimeout(() => {
            setSortId(null);
        }, 200); // Wait for transition duration (200ms)
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

            // Determine target blur based on animation phase
            const desiredBlur = progress >= ANIMATION_END ? STD_DEV_HIGH : STD_DEV_LOW;

            // If target changes, cancel any running animation and start a new one
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
        // We calculate transform based on the id's own properties
        // But we only applying scale if it matches the current scaleId
        if (id === scaleId) {
            // Translate center of polygon to center of SVG (400, 250)
            const tx = 400 - cx;
            const ty = 250 - cy;
            return `translate(${tx}px, ${ty}px) scale(${scaleX}, ${scaleY})`;
        }
        return "translate(0px, 0px) scale(1, 1)";
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

            {/* Labels positioned outside SVG for sharp text */}
            <div className={styles.labels}>
                {POLYGONS.map((area) => (
                    <div
                        key={area.id}
                        className={`${styles.areaLabelContainer} ${sortId === area.id ? styles.active : sortId ? styles.inactive : ""
                            }`}
                        style={
                            {
                                "--cx": `${area.cx}px`,
                                "--cy": `${area.cy}px`,
                            } as CSSProperties
                        }
                    >
                        <span className={`${styles.areaLabel} ${area.labelClass}`}>
                            {area.label.map((line, i) => (
                                <span key={i}>
                                    {line}
                                    {i < area.label.length - 1 && <br />}
                                </span>
                            ))}
                        </span>

                        {area.keywords && (
                            <div className={styles.keywords}>
                                {area.keywords.map((kw, i) => {
                                    // Distribute keywords in a spiral or random scatter
                                    // Using deterministic pseudo-random based on index + string length
                                    const angle = (i * (360 / area.keywords.length) + i * 20) % 360;
                                    const dist = 140 + (i % 3) * 40; // Vary distance from center (140-220px)
                                    const x = Math.cos((angle * Math.PI) / 180) * dist;
                                    const y = Math.sin((angle * Math.PI) / 180) * dist;

                                    return (
                                        <span
                                            key={i}
                                            className={styles.keyword}
                                            style={{
                                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                            }}
                                        >
                                            {kw}
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
