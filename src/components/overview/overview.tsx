"use client";
import { Diagram } from "./index";
import styles from "./overview.module.scss";

export function Overview() {
  return (
    <div className={`${styles.overview} container`}>
      <h2 className="title">My Professional Core</h2>
      <div className={styles.columns}>
        <div className={`${styles.textWrapper} content`}>
          <p>
            I am a&nbsp;<strong>Frontend-focused Product Engineer</strong> with 15+ years of experience, a&nbsp;<strong>player-coach</strong>, and a&nbsp;<strong>bridge</strong> between business, design, and development.
          </p>
          <p>
            My identity is defined by three core characteristics: <strong>Product-Oriented</strong>, <strong>Reasonable</strong>, <strong>Perfectionist</strong>.
          </p>
          <ul className={styles.identityList}>
            <li>
              <strong>Product-Oriented:</strong> I feel a deep personal
              responsibility for what I build. I put a lot of effort into my work,
              and I am genuinely interested in its success.
            </li>
            <li>
              <strong>Reasonable:</strong> I rely on data and critical thinking to
              make complex decisions and practical compromises. Subjective, biased
              choices are often very costly, and even the smartest people can fall
              into <a href="https://pubmed.ncbi.nlm.nih.gov/22663351/" target="_blank">cognitive traps</a>.
            </li>
            <li>
              <strong>Perfectionist:</strong> Building something truly great is
              very important to me. I care deeply about the quality of my craft
              and want to be proud of my work.
            </li>
          </ul>
        </div>
        <div className={styles.graphicsWrapper}>
          <p className="content">
            The interactive diagram below maps out my key professional areas. Hover over each area to explore the principles that guide my work.
          </p>
          <Diagram />
        </div>
      </div>
    </div>
  );
}
