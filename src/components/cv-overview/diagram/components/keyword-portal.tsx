import { createPortal } from "react-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import type { KeywordInfo, PolygonId } from "../data";
import styles from "./keyword-portal.module.scss";

/** Unique filter ID for the organic blob effect */
const ORGANIC_FILTER_ID = "organic-blob-filter";

type KeywordPortalProps = {
    keyword: KeywordInfo;
    /** Position where the keyword button is located (relative to diagram container) */
    keywordPosition: { x: number; y: number };
    /** Polygon ID for color theming */
    polygonId: PolygonId;
    /** Reference to the diagram container for position calculations */
    diagramRef: React.RefObject<HTMLDivElement | null>;
    /** Callback when portal should close */
    onClose: () => void;
    /** Whether the portal content is visible */
    isOpen: boolean;
};

/** Maps polygon ID to a light background color (HSL) */
const POLYGON_COLORS: Record<PolygonId, { bg: string; glow: string }> = {
    topLeft: {
        bg: "hsl(50deg 100% 92%)",
        glow: "hsl(50deg 100% 80% / 40%)",
    },
    topRight: {
        bg: "hsl(10deg 100% 94%)",
        glow: "hsl(10deg 100% 85% / 40%)",
    },
    bottomLeft: {
        bg: "hsl(140deg 70% 92%)",
        glow: "hsl(140deg 70% 80% / 40%)",
    },
    bottomRight: {
        bg: "hsl(225deg 70% 94%)",
        glow: "hsl(225deg 70% 85% / 40%)",
    },
};

/**
 * Portal component that renders expanded keyword details outside the masked diagram.
 * Uses SVG filters to create organic blob-like appearance that integrates with brain aesthetic.
 */
export function KeywordPortal({
    keyword,
    keywordPosition,
    polygonId,
    diagramRef,
    onClose,
    isOpen,
}: KeywordPortalProps) {
    const colors = POLYGON_COLORS[polygonId];
    const portalRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    // Calculate position relative to viewport
    const updatePosition = useCallback(() => {
        if (!diagramRef.current) return;

        const diagramRect = diagramRef.current.getBoundingClientRect();

        // Convert keyword position (relative to diagram center) to viewport coordinates
        const centerX = diagramRect.left + diagramRect.width / 2;
        const centerY = diagramRect.top + diagramRect.height / 2 - diagramRect.height / 20;

        setPosition({
            left: centerX + keywordPosition.x,
            top: centerY + keywordPosition.y,
        });
    }, [diagramRef, keywordPosition]);

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

    // Close on click outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (portalRef.current && !portalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        // Delay to prevent immediate close from the opening click
        const timer = setTimeout(() => {
            document.addEventListener("click", handleClickOutside);
        }, 100);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

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

                    {/* Softer variant for the outer glow */}
                    <filter id="organic-glow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="15" result="blur" />
                        <feColorMatrix
                            type="matrix"
                            values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 0.3 0"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Main popup with organic styling */}
            <div
                ref={portalRef}
                className={`${styles.popup} ${isAnimating ? styles.popupVisible : ""}`}
                style={{
                    position: "fixed",
                    top: position.top,
                    left: position.left,
                    "--popup-bg": colors.bg,
                    "--popup-glow": colors.glow,
                } as React.CSSProperties}
                role="dialog"
                aria-modal="true"
                aria-labelledby="keyword-title"
            >
                {/* Organic blob background layers */}
                <div className={styles.blobContainer}>
                    {/* Outer glow blob */}
                    <div className={styles.blobGlow} />
                    {/* Main organic blob shape */}
                    <div className={styles.blobMain} />
                    {/* Inner highlight blob */}
                    <div className={styles.blobHighlight} />
                </div>

                {/* Content wrapper */}
                <div className={styles.content}>
                    <h3 id="keyword-title" className={styles.title}>
                        {keyword.name}
                    </h3>
                    <p className={styles.description}>{keyword.description}</p>
                </div>
            </div>
        </>
    );

    return createPortal(portalContent, document.body);
}
