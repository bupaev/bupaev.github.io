import { useState, useEffect, useCallback } from "react";
import styles from "./dark-mode-toggle.module.scss";
import { SunIcon } from "./icons/sun-icon";
import { MoonIcon } from "./icons/moon-icon";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [mounted, setMounted] = useState(false);

  const setDarkMode = useCallback((dark: boolean) => {
    setIsDark(dark);
    const theme = dark ? "dark" : "light";
    document.documentElement.setAttribute("data-color-scheme", theme);
    document.cookie = `color-scheme=${theme}; max-age=21600`;
  }, []);

  const setCompactState = useCallback(() => {
    setIsCompact(window.scrollY > 5);
  }, []);

  useEffect(() => {
    setMounted(true);

    const savedSchemeValue = getCookie("color-scheme");
    if (savedSchemeValue === undefined) {
      setDarkMode(
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } else {
      setDarkMode(savedSchemeValue === "dark");
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (getCookie("color-scheme")) return;
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    setCompactState();
    window.addEventListener("scroll", setCompactState);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("scroll", setCompactState);
    };
  }, [setDarkMode, setCompactState]);

  const toggleClasses = [
    styles.darkModeToggle,
    isDark ? styles.darkModeEnabled : "",
    isCompact ? styles.compact : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!mounted) {
    return <div className={styles.darkModeToggle} style={{ visibility: "hidden" }}></div>;
  }

  return (
    <div
      className={toggleClasses}
      onClick={() => setDarkMode(!isDark)}
      role="button"
      tabIndex={0}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setDarkMode(!isDark);
        }
      }}
    >
      {/* Icon viewport with vertical sliding track */}
      {/* Moon above Sun: Light→Dark slides down (sunset), Dark→Light slides up (sunrise) */}
      <div className={styles.handler}>
        <div className={styles.iconTrack}>
          <MoonIcon className={styles.iconDark} />
          <SunIcon className={styles.iconLight} />
        </div>
      </div>

      {/* Cross-fading labels */}
      <div className={styles.labelWrap}>
        <span className={styles.labelLight}>Light</span>
        <span className={styles.labelDark}>Dark</span>
      </div>
    </div>
  );
}
