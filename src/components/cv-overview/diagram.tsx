import styles from "./diagram.module.scss";

/**
 * Diagram component displaying four overlapping skill areas
 * with a gooey color transition effect creating a blob-like appearance.
 * Uses native SVG elements instead of HTML divs for Safari CSS animation compatibility.
 * Labels are positioned outside the SVG to prevent blur from the filter.
 */
export function Diagram() {
    return (
        <div className={styles.diagram}>
            {/* SVG with native elements - filter applied via attribute for Safari compatibility */}
            <svg
                className={styles.gooSvg}
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <filter id="goo">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="40"
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
                <g filter="url(#goo)">
                    {/* Front-end engineering - larger (55%) */}
                    <ellipse
                        className={styles.areaTopLeft}
                        cx="137.5"
                        cy="137.5"
                        rx="137.5"
                        ry="137.5"
                    />
                    {/* Leadership */}
                    <ellipse
                        className={styles.areaTopRight}
                        cx="380"
                        cy="120"
                        rx="120"
                        ry="120"
                    />
                    {/* UI/UX Design */}
                    <ellipse
                        className={styles.areaBottomLeft}
                        cx="120"
                        cy="380"
                        rx="120"
                        ry="120"
                    />
                    {/* AI expertize */}
                    <ellipse
                        className={styles.areaBottomRight}
                        cx="375"
                        cy="375"
                        rx="125"
                        ry="125"
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
