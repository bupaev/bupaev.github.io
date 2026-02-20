import { useState } from "react";
import type { AreaData, AreaId } from "../data";
import styles from "./text-view.module.scss";
import themeStyles from "../diagram-config.module.scss";

const THEME_CLASS_MAP: Record<AreaId, string> = {
    topLeft: themeStyles.themeTopLeft,
    topRight: themeStyles.themeTopRight,
    bottomLeft: themeStyles.themeBottomLeft,
    bottomRight: themeStyles.themeBottomRight,
};

type TextViewProps = {
    areas: AreaData[];
};

export function TextView({ areas }: TextViewProps) {
    const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

    const toggleTopic = (key: string) => {
        setExpandedTopic(prev => prev === key ? null : key);
    };

    return (
        <div className={styles.textView}>
            {areas.map((area) => (
                <div
                    key={area.id}
                    className={`${styles.area} ${THEME_CLASS_MAP[area.id]}`}
                >
                    <h3 className={styles.areaHeading}>
                        {area.headingText}
                    </h3>
                    <ul className={styles.topicList}>
                        {area.topics.map((topic, i) => {
                            const key = `${area.id}-${i}`;
                            const isExpanded = expandedTopic === key;
                            return (
                                <li key={i} className={styles.topicItem}>
                                    <button
                                        type="button"
                                        className={`${styles.topicButton} ${isExpanded ? styles.topicExpanded : ""}`}
                                        onClick={() => toggleTopic(key)}
                                        aria-expanded={isExpanded}
                                    >
                                        <span className={styles.topicName}>{topic.name}</span>
                                        <svg
                                            className={styles.chevron}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M6 9L12 15L18 9"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                    <div
                                        className={`${styles.description} ${isExpanded ? styles.descriptionVisible : ""}`}
                                    >
                                        <p>{topic.description}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
}
