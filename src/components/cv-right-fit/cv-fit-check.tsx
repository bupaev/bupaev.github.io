"use client";

import { FIT_CRITERIA } from "./right-fit-data";
import styles from "./cv-fit-check.module.scss";

export function CvFitCheck() {
  return (
    <div className={`${styles.fitCheck} container`}>
      <h2 className="title text-4xl leading-tight">Are We the Right Fit?</h2>
      <p className={styles.subtitle}>
        I am a reasonable perfectionist who cares about the product. To save our
        mutual time, here is a breakdown of environments where I bring the most
        value versus where I might not be the right fit.
      </p>

      <div className={styles.criteriaList}>
        {FIT_CRITERIA.map((criterion) => (
          <div key={criterion.title} className={styles.criterionGroup}>
            <h3 className={styles.criterionTitle}>
              <span className={styles.titleBullet} aria-hidden="true" />
              {criterion.title}
            </h3>
            <div className={styles.cardsRow}>
              <div className={`${styles.card} ${styles.fitCard}`}>
                <div className={styles.cardLabel}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    ✓
                  </span>
                  <span>I Fit</span>
                </div>
                <p className={styles.cardText}>{criterion.fit}</p>
              </div>
              <div className={`${styles.card} ${styles.noFitCard}`}>
                <div className={styles.cardLabel}>
                  <span className={styles.crossIcon} aria-hidden="true">
                    ✗
                  </span>
                  <span>I Don&apos;t Fit</span>
                </div>
                <p className={styles.cardText}>{criterion.noFit}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
