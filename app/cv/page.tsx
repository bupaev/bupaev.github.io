"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { DarkModeToggle } from "@/components/dark-mode-toggle/dark-mode-toggle";
import { CvVerticalMenu } from "@/components/cv-vertical-menu/cv-vertical-menu";
import { CvHeroArea } from "@/components/cv-hero-area/cv-hero-area";
import { CvOverview } from "@/components/cv-overview/cv-overview";
import { CvSkills } from "@/components/cv-skills/cv-skills";
import { CvExperience } from "@/components/cv-experience/cv-experience";
import { CvEducation } from "@/components/cv-education/cv-education";
import { TheFooter } from "@/components/the-footer/the-footer";
import styles from "./cv.module.scss";

export default function CvPage() {
  const heroAreaRef = useRef<HTMLElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  const onScroll = useCallback(() => {
    const heroAreaHeight = heroAreaRef.current?.clientHeight || 0;
    if (window.scrollY < heroAreaHeight) {
      setMenuStyle({ top: `${heroAreaHeight}px`, position: "absolute" });
    } else {
      setMenuStyle({});
    }
  }, []);

  const onResize = useCallback(() => {
    onScroll();

    if (window.innerWidth <= 768) {
      window.addEventListener("scroll", onScroll);
    } else {
      window.removeEventListener("scroll", onScroll);
      setMenuStyle({});
    }
  }, [onScroll]);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      onScroll();
    }
    onResize();

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [onResize, onScroll]);

  return (
    <div className={styles.cvPage}>
      <DarkModeToggle />
      <div style={menuStyle}>
        <CvVerticalMenu />
      </div>

      <section
        id="hero-area"
        ref={heroAreaRef}
        className="anchor-for-navigation"
        style={{ position: "sticky" }}
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
