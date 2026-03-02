"use client";

import { SkillsGroup } from "./skills-group";
import styles from "./skills.module.scss";

import { SKILLS_DATA } from "./skills-data";

export function Skills() {
  return (
    <div className={`${styles.skills} container`}>
      <h2 className={`title ${styles.skillsTitle}`}>Skills</h2>
      <div className="content">
        <p>
          We are currently experiencing a tectonic shift in the IT industry. 
          Skills that were critical yesterday and defined your market value, 
          are rapidly losing their relevance today, as AI handles syntax and coding far better than any human.
        </p>
        <p>
          I am fortunate that writing code was never my end goal or sole skill.
          What has always truly interested me is creating real, working products that I can be proud of.
          Nevertheless, the good old list of tools and technologies I possess may still be useful.
        </p>
        <h3 className={styles.whatIDoHeading}>What Can I Do</h3>
        <ul className={styles.whatIDoList}>
          <li>
            <span className={styles.cardIcon}>{"{ }"}</span>
            <span className={styles.cardNumber}>1</span>
            <strong className={styles.cardTitle}>Build Complex Web Apps</strong>
            <span className={styles.cardDescription}>
              Develop and maintain scalable web applications using modern JS ecosystems (Vue, React, AEM).
              I transform complex business logic into robust, maintainable frontend architectures
              with a strong focus on core web fundamentals.
            </span>
          </li>
          <li>
            <span className={styles.cardIcon}>&#10022;</span>
            <span className={styles.cardNumber}>2</span>
            <strong className={styles.cardTitle}>Craft Premium UI/UX</strong>
            <span className={styles.cardDescription}>
              Deliver reasonably pixel-perfect, rich-media interfaces. I act as the technical bridge
              between design and code to create visually stunning, strictly accessible (WCAG compliant)
              experiences that adapt flawlessly across devices.
            </span>
          </li>
          <li>
            <span className={styles.cardIcon}>&#9635;</span>
            <span className={styles.cardNumber}>3</span>
            <strong className={styles.cardTitle}>Drive Prototyping & Flows</strong>
            <span className={styles.cardDescription}>
              Translate abstract business requirements into actionable engineering plans.
              I create wireframes, define logical user flows, and build interactive HTML prototypes
              to validate ideas before heavy development begins.
            </span>
          </li>
          <li>
            <span className={styles.cardIcon}>&#9872;</span>
            <span className={styles.cardNumber}>4</span>
            <strong className={styles.cardTitle}>Lead as a &ldquo;Player-Coach&rdquo;</strong>
            <span className={styles.cardDescription}>
              Manage Agile teams, establish CI/CD workflows, and enforce objective code quality metrics.
              My true passion remains in the codebase&mdash;leading by example, mentoring peers,
              and crafting the real product alongside my team.
            </span>
          </li>
        </ul>
        <h3>Detailed list:</h3>
        <div className={styles.skillsGroupsContainer}>
          {SKILLS_DATA.map((skillGroup) => (
            <SkillsGroup
              key={skillGroup.title}
              title={skillGroup.title}
              items={skillGroup.items}
              className="mb-3 p-3"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
