"use client";

import { FIT_CRITERIA } from "./fit-check-data";
import styles from "./fit-check.module.scss";

export function FitCheck() {
  return (
    <div className={`${styles.fitCheck} container`}>
      <h2 className="title text-4xl leading-tight">Are We the Right Fit?</h2>
      <p className={styles.subtitle}>
        To save our mutual time, here is a breakdown of environments where I bring the most value 
        versus where I might not be the right fit.
      </p>

      <div className={styles.tableContainer}>
        {/* Desktop Header */}
        <div className={styles.tableHeader} aria-hidden="true">
          <div className={styles.headerCell}>CRITERIA</div>
          <div className={styles.headerCell}>
            <span className={styles.checkIcon} aria-hidden="true">✓</span>
            I FIT
              <span className="pl-2 text-[1em]">if...</span>
            </div>
          <div className={styles.headerCell}>
            <span className={styles.crossIcon} aria-hidden="true">✗</span>
            I DON&apos;T FIT 
            <span className="pl-2 text-[1em]">if...</span>
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
                  <span className={styles.checkIcon} aria-hidden="true">
                    ✓
                  </span>
                  <span>I Fit</span>
                </div>
                <p className={styles.cellText}>{criterion.fit}</p>
              </div>

              {/* No Fit Cell */}
              <div className={`${styles.dataCell} ${styles.noFitCell}`}>
                <div className={styles.mobileLabel}>
                  <span className={styles.crossIcon} aria-hidden="true">
                    ✗
                  </span>
                  <span>I Don&apos;t Fit</span>
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
