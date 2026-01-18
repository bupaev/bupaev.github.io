"use client";

import { Timeline } from "./timeline";
import ExperienceContent from "./content/experience.mdx";
import styles from "./cv-experience.module.scss";

export function CvExperience() {
  return (
    <div className={`${styles.experience} container`}>
      <h2 className="title text-4xl leading-tight">Experience</h2>
      <Timeline />
      <div className="content mt-6">
        <ExperienceContent />
      </div>
    </div>
  );
}
