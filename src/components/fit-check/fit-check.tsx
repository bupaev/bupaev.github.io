"use client";

import { FIT_CRITERIA } from "./fit-check-data";
import styles from "./fit-check.module.scss";

export function FitCheck() {
  return (
    <div className={`${styles.fitCheck} container`}>
      <h2 className="title">Are We the Right Fit?</h2>
      <p className={styles.subtitle}>
        Here is a quick, honest look at how I work, to help us figure out if we're a good fit for each other.
      </p>

      <div className={styles.tableContainer}>
        {/* Desktop Header */}
        <div className={styles.tableHeader} aria-hidden="true">
          <div className={styles.headerCell}></div>
          <div className={`${styles.headerCell} ${styles.fit}`}>
            <span className={styles.fitIcon} aria-hidden="true" />
            <span>We are a GREAT FIT if...</span>
          </div>
          <div className={`${styles.headerCell} ${styles.noFit}`}>
            <span className={styles.noFitIcon} aria-hidden="true" />
            <span>We are likely NOT A FIT if...</span>
          </div>
        </div>

        {/* Rows */}
        <div className={styles.tableBody}>
          {FIT_CRITERIA.map((criterion) => (
            <div key={criterion.title} className={styles.tableRow}>
              {/* Title Cell */}
              <div className={styles.titleCell}>
                <h3 className={styles.criterionTitle}>
                  {criterion.title}
                </h3>
              </div>

              {/* Fit Cell */}
              <div className={`${styles.dataCell} ${styles.fitCell}`}>
                <div className={styles.mobileLabel}>
                  <span className={styles.fitIcon} aria-hidden="true" />
                  <span>We are a GREAT FIT if...</span>
                </div>
                <p className={styles.cellText}>{criterion.fit}</p>
              </div>

              {/* No Fit Cell */}
              <div className={`${styles.dataCell} ${styles.noFitCell}`}>
                <div className={styles.mobileLabel}>
                  <span className={styles.noFitIcon} aria-hidden="true" />
                  <span>We are NOT A FIT if...</span>
                </div>
                <p className={styles.cellText}>{criterion.noFit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
