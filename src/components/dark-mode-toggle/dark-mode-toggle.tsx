"use client";

import { useState, useEffect, useCallback } from "react";

import styles from "./dark-mode-toggle.module.scss";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? matches[1] : undefined;
}

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [mounted, setMounted] = useState(false);

  const setDarkMode = useCallback((dark: boolean) => {
    setIsDark(dark);
    const theme = dark ? "dark" : "light";
    document.documentElement.setAttribute("data-color-scheme", theme);
    // remember user's choice for next six hours
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
      if (getCookie("color-scheme")) {
        return;
      }
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

  if (!mounted) {
    return null;
  }

  const toggleClasses = [
    styles.darkModeToggle,
    "max-lg:hidden",
    isDark ? styles.darkModeEnabled : "",
    isCompact ? styles.compact : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <div className={toggleClasses} onClick={() => setDarkMode(!isDark)}>
        <div className={styles.slider}>
          <span className={styles.labelDark}>Dark</span>
          <div className={styles.handler}>
            <img
              className={styles.iconLight}
              src="/icons/dark-mode/sun.svg"
              alt="Light mode"
              width={30}
              height={30}
            />
            <img
              className={styles.iconDark}
              src="/icons/dark-mode/moon.svg"
              alt="Dark mode"
              width={30}
              height={30}
            />
          </div>
          <span className={styles.labelLight}>Light</span>
        </div>
      </div>
    </div>
  );
}
