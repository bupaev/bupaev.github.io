import styles from "./view-mode-toggle.module.scss";

type ViewMode = "graphic" | "text";

type ViewModeToggleProps = {
    mode: ViewMode;
    onToggle: () => void;
};

/** Icon: three staggered horizontal lines (list/text view indicator) */
function ListIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
            <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 18H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

/** Icon: four abstract quadrants (graphic/diagram view indicator) */
function DiagramIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
            <rect x="3" y="3" width="7.5" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
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
                {isText ? <DiagramIcon /> : <ListIcon />}
            </span>
        </button>
    );
}
