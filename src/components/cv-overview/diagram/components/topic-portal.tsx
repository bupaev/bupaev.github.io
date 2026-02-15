import { createPortal } from "react-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import type { AreaId, TopicInfo } from "../data";
import styles from "./topic-portal.module.scss";
import themeStyles from "../diagram-config.module.scss";

/** Unique filter ID for the organic blob effect */
const ORGANIC_FILTER_ID = "organic-blob-filter";

type TopicPortalProps = {
    topic: TopicInfo;
    /** Position where the topic button is located (relative to diagram container) */
    topicPosition: { x: number; y: number };
    /** Area ID for color theming */
    areaId: AreaId;
    /** Reference to the diagram container for position calculations */
    diagramRef: React.RefObject<HTMLDivElement | null>;
    /** Callback when portal should close */
    onClose: () => void;
    /** Whether the portal content is visible */
    isOpen: boolean;
};

/** Maps area ID to its theme class */
const THEME_CLASS_MAP: Record<AreaId, string> = {
    topLeft: themeStyles.themeTopLeft,
    topRight: themeStyles.themeTopRight,
    bottomLeft: themeStyles.themeBottomLeft,
    bottomRight: themeStyles.themeBottomRight,
};

/**
 * Portal component that renders expanded topic details outside the masked diagram.
 * Uses SVG filters to create organic blob-like appearance that integrates with brain aesthetic.
 */
export function TopicPortal({
    topic,
    topicPosition,
    areaId,
    diagramRef,
    onClose,
    isOpen,
}: TopicPortalProps) {
    const portalRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    // Calculate position relative to viewport
    const updatePosition = useCallback(() => {
        if (!diagramRef.current) return;

        const diagramRect = diagramRef.current.getBoundingClientRect();

        // Convert topic position (relative to diagram center) to viewport coordinates
        const centerX = diagramRect.left + diagramRect.width / 2;
        const centerY = diagramRect.top + diagramRect.height / 2 - diagramRect.height / 20;

        // Check if we are on a small screen (tablet or mobile)
        // Breakpoint matches $breakpoint-lg (960px) from variables.scss
        const isSmallScreen = window.innerWidth < 960;

        if (isSmallScreen) {
            // center the popup on the diagram for maximum space
            setPosition({
                left: centerX,
                top: centerY,
            });
        } else {
            setPosition({
                left: centerX + topicPosition.x,
                top: centerY + topicPosition.y,
            });
        }
    }, [diagramRef, topicPosition]);

    // Handle open/close animations
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            updatePosition();
            // Double rAF ensures browser paints initial state before animating
            // First rAF: browser schedules paint with initial styles
            // Second rAF: after paint, we apply the visible class to trigger transition
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsAnimating(true);
                });
            });
        } else if (shouldRender) {
            setIsAnimating(false);
            // Wait for exit animation before unmounting
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [isOpen, shouldRender, updatePosition]);

    // Update position on scroll/resize
    useEffect(() => {
        if (!shouldRender) return;

        const handleUpdate = () => updatePosition();
        window.addEventListener("scroll", handleUpdate, { passive: true });
        window.addEventListener("resize", handleUpdate, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleUpdate);
            window.removeEventListener("resize", handleUpdate);
        };
    }, [shouldRender, updatePosition]);

    // Close on Escape or Click Outside (for mobile reliability)
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (
                portalRef.current &&
                !portalRef.current.contains(e.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        // Use mousedown/touchstart for better responsiveness than click
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Track mouse position for hover effects
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty("--x", `${x}%`);
        e.currentTarget.style.setProperty("--y", `${y}%`);
    }, []);

    if (!shouldRender) return null;

    const portalContent = (
        <>
            {/* SVG filters for organic blob effect */}
            <svg className={styles.filterSvg} aria-hidden="true">
                <defs>
                    {/* Main organic blob filter with turbulence and displacement */}
                    <filter
                        id={ORGANIC_FILTER_ID}
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                        colorInterpolationFilters="sRGB"
                    >
                        {/* Create organic noise pattern */}
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.02"
                            numOctaves="2"
                            seed="8"
                            result="turbulence"
                        />

                        {/* Displace edges using noise for wavy organic borders */}
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="turbulence"
                            scale="15"
                            xChannelSelector="R"
                            yChannelSelector="G"
                            result="displaced"
                        />

                        {/* Slight blur to soften the displaced edges */}
                        <feGaussianBlur in="displaced" stdDeviation="3" result="blurred" />

                        {/* Boost alpha for gooey blob effect */}
                        <feColorMatrix
                            in="blurred"
                            type="matrix"
                            values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 22 -10"
                            result="gooey"
                        />

                        {/* Additional subtle blur for feathered edges */}
                        <feGaussianBlur in="gooey" stdDeviation="1" result="feathered" />

                        {/* Composite to clip and finalize */}
                        <feComposite in="feathered" in2="gooey" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Main popup with organic styling */}
            <div
                ref={portalRef}
                className={`${styles.popup} ${isAnimating ? styles.popupVisible : ""} ${THEME_CLASS_MAP[areaId]}`}
                style={{
                    position: "fixed",
                    top: position.top,
                    left: position.left,
                } as React.CSSProperties}
                role="dialog"
                aria-modal="true"
                aria-labelledby="topic-title"
                onMouseMove={handleMouseMove}
                onMouseLeave={onClose}
            >
                <div className={styles.blobBackground} />

                {/* Content wrapper */}
                <div className={styles.content}>
                    <h3 id="topic-title" className={styles.title}>
                        {topic.name}
                    </h3>
                    <p className={styles.description}>{topic.description}</p>
                </div>
            </div>
        </>
    );

    return createPortal(portalContent, document.body);
}
