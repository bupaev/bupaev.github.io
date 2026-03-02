import styles from "./view-mode-toggle.module.scss";

type ViewMode = "graphic" | "text";

type ViewModeToggleProps = {
    mode: ViewMode;
    onToggle: () => void;
};

function ListIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
            <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 18H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function DiagramIcon() {
    return (
        <svg viewBox="0 0 128 128" fill="none" className={styles.icon}>
            <path stroke="currentColor" strokeWidth="5" fill="currentColor" d="M47.7 13.1A36 36 0 0 0 36 18.4c-.8.7-4 2-7.1 2.9C19.2 24.2 14.3 30 4.4 50c-1.5 3-2.9 7.5-3.2 10a32 32 0 0 0 7.2 19.9 29 29 0 0 1 4.6 7c.8 1.9 2.7 4.9 4.2 6.7 2.7 3 2.7 3.3 1.4 6.5q-3 7.5 5.5 12c3.8 1.9 4.7 2 7.8.9 1.9-.7 6.2-3.4 9.5-6 3.4-2.5 7.8-5.7 9.9-6.9l3.8-2.3 7 2.2c7.6 2.5 13 2.3 21.1-.6 2.7-1 5.9-1.3 8.7-1q10.1 1.3 21.6-8.1a33 33 0 0 0 11.1-37.7 34 34 0 0 0-14.3-19.1c-3.4-2.3-8-5.8-10.3-7.9a60 60 0 0 0-11.9-7.4 29 29 0 0 0-15.6-3.9c-4.4-.1-9.6-.6-11.5-1.2a23 23 0 0 0-13.3 0m12.8 6c2.2.6 7.6 1.2 12.1 1.3q14.3.4 23.3 9.6c2 2 5.1 4.5 7 5.4a36 36 0 0 1 14.7 15.9c3.7 8.2 4 18.1.6 24.4a51 51 0 0 1-18 15.9l-3.8.9c-.6.2-2.9 0-4.9-.5-2.9-.7-5-.4-8.8 1.1a34 34 0 0 1-22.1.4l-5.9-1.9-5.3 2.8c-2.9 1.5-8.5 5.2-12.4 8.2-7.7 5.8-8.1 6-11.1 4.4-2.3-1.3-2.6-6.2-.4-8 2.4-2 1.8-4.3-2.5-8.5a22 22 0 0 1-5.1-7.4c-.7-2-2.9-5.5-5-7.8-5-5.4-6.5-11-5.1-18.2.6-2.9 2.3-6.9 3.8-8.8s4-6.1 5.6-9.3a23 23 0 0 1 15.7-12.6c2-.4 5.1-1.8 6.9-3.2a32 32 0 0 1 14.7-5.1c1.1 0 3.8.4 6 1"/>
        </svg>
    );
}

export function ViewModeToggle({ mode, onToggle }: ViewModeToggleProps) {
    const isText = mode === "text";

    return (
        <button
            type="button"
            className={styles.toggle}
            onClick={onToggle}
            aria-label={`Switch to ${isText ? "graphic" : "text"} view`}
        >
            <span className={styles.handler}>
                <span className={`${styles.iconWrapper} ${isText ? styles.hiddenIcon : ""}`}>
                    <ListIcon />
                </span>
                <span className={`${styles.iconWrapper} ${!isText ? styles.hiddenIcon : ""}`}>
                    <DiagramIcon />
                </span>
            </span>
            <span className={styles.textContainer}>
                <span className={`${styles.textWrapper} ${!isText ? styles.hiddenText : ""}`}>
                    Show Graphics
                </span>
                <span className={`${styles.textWrapper} ${isText ? styles.hiddenText : ""}`}>
                    Show as Text
                </span>
            </span>
        </button>
    );
}
