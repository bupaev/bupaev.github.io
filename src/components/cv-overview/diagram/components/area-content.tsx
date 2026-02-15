import { useState, useEffect, useCallback, useMemo } from "react";
import type { AreaData, AreaId, TopicInfo } from "../data";
import { TopicPortal } from "./topic-portal";
import styles from "./area-content.module.scss";

import themeStyles from "../diagram-config.module.scss";

// Base dimensions of the diagram container (SVG viewport size)
const CONTAINER_WIDTH = 800;
const CONTAINER_HEIGHT = 500;

// Center coordinates derived from container dimensions (for reference)
const CONTAINER_CENTER_X = CONTAINER_WIDTH / 2;
const CONTAINER_CENTER_Y = CONTAINER_HEIGHT / 2 - CONTAINER_HEIGHT / 20;

// Coordinate used to move the mouse position effectively "off-screen" when the mouse leaves the container
const MOUSE_OFF_SCREEN_COORD = Math.max(CONTAINER_WIDTH, CONTAINER_HEIGHT) * 20;

// Horizontal radius for the elliptical distribution of topics 
const TOPIC_DISTRIBUTION_RADIUS_X = CONTAINER_WIDTH * 0.27;

// Vertical radius for the elliptical distribution of topics
const TOPIC_DISTRIBUTION_RADIUS_Y = CONTAINER_HEIGHT * 0.27;

// Maximum distance from cursor for magnification effect (30% of container height)
const MOUSE_PROXIMITY_THRESHOLD = CONTAINER_HEIGHT * 0.3;

// Maximum scale factor applied to a topic when the mouse is directly over it
const TOPIC_MAX_SCALE = 1.4;

// Base scale factor for topics when getting far from the mouse
const TOPIC_MIN_SCALE = 1;

// Scale threshold at which a topic is brought to the front (z-index boost)
const TOPIC_Z_INDEX_THRESHOLD = 1.1;

// Z-index for topics that are magnified/active
const Z_INDEX_ACTIVE = 10;

// Z-index for topics in their normal state
const Z_INDEX_NORMAL = 1;

// Z-index for expanded topic
const Z_INDEX_EXPANDED = 100;

/** Maps area id to its heading entrance animation class */
const HEADING_CLASS_MAP: Record<AreaId, string> = {
    topLeft: styles.headingTopLeft,
    topRight: styles.headingTopRight,
    bottomLeft: styles.headingBottomLeft,
    bottomRight: styles.headingBottomRight,
};

/** Maps area ID to its theme class */
const THEME_CLASS_MAP: Record<AreaId, string> = {
    topLeft: themeStyles.themeTopLeft,
    topRight: themeStyles.themeTopRight,
    bottomLeft: themeStyles.themeBottomLeft,
    bottomRight: themeStyles.themeBottomRight,
};

type ExpandedTopic = {
    areaId: AreaId;
    topicIndex: number;
} | null;

type AreaContentProps = {
    areas: AreaData[];
    scaleId: AreaId | null;
    expandedTopic: ExpandedTopic;
    containerRef: React.RefObject<HTMLDivElement | null>;
    /** Reference to the diagram container for portal positioning */
    diagramRef: React.RefObject<HTMLDivElement | null>;
    onMouseEnter: (id: AreaId) => void;
    onMouseLeave: () => void;
    onTopicToggle: (areaId: AreaId, topicIndex: number) => void;
};

export function AreaContent({ areas, scaleId, expandedTopic, containerRef, diagramRef, onMouseEnter, onMouseLeave, onTopicToggle }: AreaContentProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 577px)");
        const handler = (e: MediaQueryListEvent) => setIsLargeScreen(e.matches);

        // Set initial value
        setIsLargeScreen(mediaQuery.matches);

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        // Normalize mouse coordinates to reference 800x500 space
        const scaleX = CONTAINER_WIDTH / rect.width;
        const scaleY = CONTAINER_HEIGHT / rect.height;

        const x = (e.clientX - rect.left) * scaleX - CONTAINER_CENTER_X;
        const y = (e.clientY - rect.top) * scaleY - CONTAINER_CENTER_Y;
        setMousePos({ x, y });
    };

    // Close expanded topic on Escape
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape" && expandedTopic) {
            onTopicToggle(expandedTopic.areaId, expandedTopic.topicIndex);
        }
    }, [expandedTopic, onTopicToggle]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Find the expanded topic data and position for portal
    const currentTopicData = useMemo(() => {
        if (!expandedTopic) return null;

        const area = areas.find((p) => p.id === expandedTopic.areaId);
        if (!area) return null;

        const topic = area.topics[expandedTopic.topicIndex];
        if (!topic) return null;

        const total = area.topics.length;
        const angle = -Math.PI / 2 + (2 * Math.PI * expandedTopic.topicIndex) / total;
        const kx = Math.cos(angle) * TOPIC_DISTRIBUTION_RADIUS_X;
        const ky = Math.sin(angle) * TOPIC_DISTRIBUTION_RADIUS_Y;

        return { topic, position: { x: kx, y: ky }, areaId: expandedTopic.areaId };
    }, [expandedTopic, areas]);

    // Keep data persistent for exit animation
    const [persistentTopicData, setPersistentTopicData] = useState<typeof currentTopicData>(null);

    useEffect(() => {
        if (currentTopicData) {
            setPersistentTopicData(currentTopicData);
        } else {
            // Buffer time to allow exit animation to complete (400ms in CSS + small margin)
            const timer = setTimeout(() => {
                setPersistentTopicData(null);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [currentTopicData]);

    const handleClosePortal = useCallback(() => {
        if (expandedTopic) {
            onTopicToggle(expandedTopic.areaId, expandedTopic.topicIndex);
        }
    }, [expandedTopic, onTopicToggle]);

    return (
        <>
            <div
                className={styles.areaContent}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setMousePos({ x: MOUSE_OFF_SCREEN_COORD, y: MOUSE_OFF_SCREEN_COORD })}
                style={
                    {
                        "--center-x": `50%`,
                        "--center-y": `45%`,
                    } as React.CSSProperties
                }
            >
                {areas.map((area) => {
                    // Keep area expanded if a topic is expanded in this area
                    const hasExpandedTopic = expandedTopic?.areaId === area.id;
                    const effectiveScaleId = hasExpandedTopic ? area.id : scaleId;
                    const isHovered = effectiveScaleId === area.id;
                    const isAnyHovered = effectiveScaleId !== null;
                    const isOtherHovered = isAnyHovered && !isHovered;

                    return (
                        <div
                            key={area.id}
                            className={`${styles.areaContentContainer} ${THEME_CLASS_MAP[area.id]} ${isHovered ? styles.active : ""
                                } ${isOtherHovered ? styles.inactive : ""}`}
                            style={
                                {
                                    "--cx": `${(area.cx / CONTAINER_WIDTH) * 100}%`,
                                    "--cy": `${(area.cy / CONTAINER_HEIGHT) * 100}%`,
                                } as React.CSSProperties
                            }
                            onMouseEnter={() => onMouseEnter(area.id)}
                            onMouseLeave={onMouseLeave}
                        >
                            <div className={`${styles.headingWrapper} ${HEADING_CLASS_MAP[area.id]}`}>
                                <h3 className={styles.areaHeading}>
                                    {area.heading}
                                </h3>
                            </div>

                            <div className={styles.topics}>
                                {area.topics.map((topic, i) => {
                                    const total = area.topics.length;
                                    const angle = -Math.PI / 2 + (2 * Math.PI * i) / total;
                                    const kx = Math.cos(angle) * TOPIC_DISTRIBUTION_RADIUS_X;
                                    const ky = Math.sin(angle) * TOPIC_DISTRIBUTION_RADIUS_Y;

                                    const dist = Math.sqrt(Math.pow(mousePos.x - kx, 2) + Math.pow(mousePos.y - ky, 2));

                                    let scale = TOPIC_MIN_SCALE;
                                    // Only apply scaling on large screens
                                    if (isLargeScreen && dist < MOUSE_PROXIMITY_THRESHOLD) {
                                        scale = TOPIC_MIN_SCALE + (TOPIC_MAX_SCALE - TOPIC_MIN_SCALE) * (1 - dist / MOUSE_PROXIMITY_THRESHOLD);
                                    }

                                    const isExpanded = expandedTopic?.areaId === area.id && expandedTopic?.topicIndex === i;
                                    return (
                                        <TopicButton
                                            key={i}
                                            topic={topic}
                                            kx={(kx / CONTAINER_WIDTH) * 100}
                                            ky={(ky / CONTAINER_HEIGHT) * 100}
                                            scale={isExpanded ? 1 : scale}
                                            isExpanded={isExpanded}
                                            zIndex={isExpanded ? Z_INDEX_EXPANDED : scale > TOPIC_Z_INDEX_THRESHOLD ? Z_INDEX_ACTIVE : Z_INDEX_NORMAL}
                                            onClick={() => onTopicToggle(area.id, i)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Portal-rendered expanded topic popup */}
            {persistentTopicData && (
                <TopicPortal
                    topic={persistentTopicData.topic}
                    topicPosition={persistentTopicData.position}
                    areaId={persistentTopicData.areaId}
                    diagramRef={diagramRef}
                    onClose={handleClosePortal}
                    isOpen={expandedTopic !== null}
                />
            )}
        </>
    );
}

type TopicButtonProps = {
    topic: TopicInfo;
    kx: number; // percentage
    ky: number; // percentage
    scale: number;
    isExpanded: boolean;
    zIndex: number;
    onClick: () => void;
};

/**
 * Topic button in the diagram - clicking opens the portal popup.
 * When expanded, this button stays in place while the portal shows the details.
 */
function TopicButton({ topic, kx, ky, scale, isExpanded, zIndex, onClick }: TopicButtonProps) {
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty("--x", `${x}%`);
        e.currentTarget.style.setProperty("--y", `${y}%`);
        e.currentTarget.style.setProperty("--x-px", `${(e.clientX - rect.left).toFixed(1)}px`);
        e.currentTarget.style.setProperty("--y-px", `${(e.clientY - rect.top).toFixed(1)}px`);
    };

    return (
        <button
            type="button"
            className={`${styles.topic} ${isExpanded ? styles.topicActive : ""}`}
            style={{
                // kx and ky are now percentages relative to parent .topics
                // We use calc to offset from center (50%) + kx%
                // But kx was computed as offset from center.
                // If kx=0, position should be 50%.
                // So left: calc(50% + kx%), top: calc(50% + ky%)
                left: `calc(50% + ${kx}%)`,
                top: `calc(50% + ${ky}%)`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                zIndex,
            }}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            aria-expanded={isExpanded}
        >
            <span className={styles.topicName} data-text={topic.name}>
                {topic.name}
            </span>
        </button>
    );
}
