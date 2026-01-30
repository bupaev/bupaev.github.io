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
                viewBox="0 0 800 500"
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
                {/* <g filter="url(#goo)"></g> */}
                <g filter="url(#goo)">
                    {/* Front-end engineering - top-left parallelogram */}
                    <polygon
                        className={styles.areaTopLeft}
                        points="127,0 464,0 400,250 63,250"
                    />
                    {/* Leadership - top-right parallelogram */}
                    <polygon
                        className={styles.areaTopRight}
                        points="464,0 800,0 736,250 400,250"
                    />
                    {/* UI/UX Design - bottom-left parallelogram */}
                    <polygon
                        className={styles.areaBottomLeft}
                        points="64,250 400,250 336,500 0,500"
                    />
                    {/* AI expertize - bottom-right parallelogram */}
                    <polygon
                        className={styles.areaBottomRight}
                        points="400,250 736,250 671,500 336,500"
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
