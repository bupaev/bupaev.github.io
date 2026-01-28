import styles from "./diagram.module.scss";

/**
 * Diagram component displaying four overlapping skill areas
 * with a gooey color transition effect creating a blob-like appearance.
 * Labels are positioned outside the filtered container to prevent blur.
 */
export function Diagram() {
    return (
        <div className={styles.diagram}>
            {/* SVG filter for gooey effect */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                className={styles.gooFilter}
            >
                <defs>
                    <filter id="goo">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="10"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Colored areas with goo filter */}
            <div className={styles.container}>
                <div className={styles.areaTopLeft} />
                <div className={styles.areaTopRight} />
                <div className={styles.areaBottomLeft} />
                <div className={styles.areaBottomRight} />
            </div>

            {/* Labels positioned outside filtered container */}
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
