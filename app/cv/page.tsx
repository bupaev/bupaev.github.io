"use client";

import { useEffect, useRef, useCallback } from "react";
import { DarkModeToggle } from "@/components/dark-mode-toggle/dark-mode-toggle";
import { CvVerticalMenu } from "@/components/cv-vertical-menu/cv-vertical-menu";
import { CvHeroArea } from "@/components/cv-hero-area/cv-hero-area";
import { CvOverview } from "@/components/cv-overview/cv-overview";
import { CvSkills } from "@/components/cv-skills/cv-skills";
import { CvExperience } from "@/components/cv-experience/cv-experience";
import { CvEducation } from "@/components/cv-education/cv-education";
import { TheFooter } from "@/components/the-footer/the-footer";
import styles from "./cv.module.scss";

/**
 * Mobile breakpoint for vertical menu positioning behavior.
 * Menu appears below hero and becomes sticky on scroll for viewports <= this width.
 */
const TOUCH_SCREEN_BREAKPOINT = 960;

export default function CvPage() {
  const heroAreaRef = useRef<HTMLElement>(null);
  const menuWrapperRef = useRef<HTMLDivElement>(null);

  /**
   * Updates the menu position based on scroll state.
   * When scrolled past hero area, menu sticks to top; otherwise stays below hero.
   */
  const updateMenuPosition = useCallback(() => {
    if (!heroAreaRef.current || !menuWrapperRef.current) return;

    const heroAreaHeight = heroAreaRef.current.clientHeight;
    const isScrolledPastHero = window.scrollY >= heroAreaHeight;

    menuWrapperRef.current.dataset.sticky = isScrolledPastHero ? "true" : "false";
  }, []);

  /**
   * Updates the CSS custom property for hero area height.
   * Used by the menu wrapper to position below the hero area on mobile.
   */
  const updateHeroHeight = useCallback(() => {
    if (!heroAreaRef.current || !menuWrapperRef.current) return;

    const heroAreaHeight = heroAreaRef.current.clientHeight;
    menuWrapperRef.current.style.setProperty("--hero-height", `${heroAreaHeight}px`);
  }, []);

  /**
   * Handles window resize events.
   * Only attaches scroll listener on mobile viewports.
   */
  const onResize = useCallback(() => {
    updateHeroHeight();

    if (window.innerWidth <= TOUCH_SCREEN_BREAKPOINT) {
      updateMenuPosition();
      window.addEventListener("scroll", updateMenuPosition, { passive: true });
    } else {
      window.removeEventListener("scroll", updateMenuPosition);
      if (menuWrapperRef.current) {
        menuWrapperRef.current.dataset.sticky = "";
      }
    }
  }, [updateHeroHeight, updateMenuPosition]);

  useEffect(() => {
    // Initial setup
    updateHeroHeight();
    if (window.innerWidth <= TOUCH_SCREEN_BREAKPOINT) {
      updateMenuPosition();
    }
    onResize();

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", updateMenuPosition);
      window.removeEventListener("resize", onResize);
    };
  }, [onResize, updateHeroHeight, updateMenuPosition]);

  return (
    <div className={styles.cvPage}>
      <DarkModeToggle />
      <div ref={menuWrapperRef} className={styles.menuWrapper}>
        <CvVerticalMenu />
      </div>

      <section
        id="hero-area"
        ref={heroAreaRef}
        className="anchor-for-navigation"
      >
        <CvHeroArea />
      </section>

      <section
        id="synopsis"
        className="section anchor-for-navigation is-primary"
      >
        <CvOverview />
      </section>

      <section
        id="skills"
        className={`section anchor-for-navigation ${styles.withBackground} ${styles.skillsSection}`}
      >
        <CvSkills />
      </section>

      <section
        id="experience"
        className={`section anchor-for-navigation ${styles.withBackground} ${styles.experienceSection}`}
      >
        <CvExperience />
      </section>

      <section
        id="education"
        className={`section anchor-for-navigation ${styles.withBackground} ${styles.educationSection}`}
      >
        <CvEducation />
      </section>

      <TheFooter />
    </div>
  );
}
