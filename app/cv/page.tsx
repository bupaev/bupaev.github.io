"use client";

import { useState, useEffect, useRef } from "react";
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
  const [heroHeight, setHeroHeight] = useState<number | undefined>(undefined);

  // Measure hero area height for menu sticky positioning
  useEffect(() => {
    const updateHeroHeight = () => {
      if (heroAreaRef.current) {
        setHeroHeight(heroAreaRef.current.clientHeight);
      }
    };

    updateHeroHeight();
    window.addEventListener("resize", updateHeroHeight);

    return () => {
      window.removeEventListener("resize", updateHeroHeight);
    };
  }, []);

  return (
    <div className={styles.cvPage}>
      <DarkModeToggle />
      <CvVerticalMenu heroHeight={heroHeight} />

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
