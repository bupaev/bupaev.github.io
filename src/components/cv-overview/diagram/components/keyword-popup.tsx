import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import type { KeywordInfo } from "../data";
import styles from "./keyword-popup.module.scss";

type PopupPosition = {
    x: number;
    y: number;
};

type KeywordPopupProps = {
    keyword: KeywordInfo;
    position: PopupPosition;
    onClose: () => void;
};

/**
 * Popup component displaying keyword name and description.
 * Renders via React Portal to avoid mask-image clipping from parent container.
 * Styled as a minimalistic thought cloud with bubble tail.
 */
export function KeywordPopup({ keyword, position, onClose }: KeywordPopupProps) {
    const popupRef = useRef<HTMLDivElement>(null);
    const [isClosing, setIsClosing] = useState(false);

    const startClose = useCallback(() => {
        if (isClosing) return;
        setIsClosing(true);
        // Wait for exit animation to complete before unmounting
        setTimeout(onClose, 150);
    }, [isClosing, onClose]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                startClose();
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                startClose();
            }
        };

        const handleScroll = () => {
            startClose();
        };

        // Delay adding listeners to prevent immediate close from the click that opened the popup
        const timeoutId = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
            window.addEventListener("scroll", handleScroll, { passive: true });
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [startClose]);

    // Calculate position to center popup above the keyword
    const popupStyle: React.CSSProperties = {
        left: position.x,
        top: position.y,
        transform: "translate(-50%, calc(-100% - 24px))",
    };

    return createPortal(
        <>
            <div className={`${styles.popupOverlay} ${isClosing ? styles.closing : ""}`} aria-hidden="true" />
            <div
                ref={popupRef}
                className={`${styles.popup} ${isClosing ? styles.closing : ""}`}
                style={popupStyle}
                role="dialog"
                aria-modal="true"
                aria-labelledby="popup-keyword-name"
            >
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={startClose}
                    aria-label="Close popup"
                >
                    ×
                </button>
                <h4 id="popup-keyword-name" className={styles.keywordName}>
                    {keyword.name}
                </h4>
                <p className={styles.description}>{keyword.description}</p>
            </div>
        </>,
        document.body
    );
}
