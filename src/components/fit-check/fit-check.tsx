"use client";

import { FIT_CRITERIA } from "./fit-check-data";
import styles from "./fit-check.module.scss";
import { FitIcon, NoFitIcon } from "./fit-check-icons";

export function FitCheck() {
  return (
    <div className={`${styles.fitCheck} container`}>
      <h2 className="title">Are We the Right Fit?</h2>
      <p className={styles.subtitle}>
        To save our mutual time, here is a breakdown of environments where I bring the most value
        versus where I might not be the right fit.
      </p>

      <div className={styles.tableContainer}>
        {/* Desktop Header */}
        <div className={styles.tableHeader} aria-hidden="true">
          <div className={styles.headerCell}></div>
          <div className={`${styles.headerCell} ${styles.fit}`}>
            <FitIcon className={styles.icon} aria-hidden="true" />
            <span>I FIT</span>
            <span className="text-[1em]">if...</span>
          </div>
          <div className={`${styles.headerCell} ${styles.noFit}`}>
            <NoFitIcon className={styles.icon} aria-hidden="true" />
            <span>I DON&apos;T FIT</span>
            <span className="text-[1em]">if...</span>
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
                  <FitIcon className={styles.icon} aria-hidden="true" />
                  <span>I FIT</span>
                  <span className="text-[1em]">if...</span>
                </div>
                <p className={styles.cellText}>{criterion.fit}</p>
              </div>

              {/* No Fit Cell */}
              <div className={`${styles.dataCell} ${styles.noFitCell}`}>
                <div className={styles.mobileLabel}>
                  <NoFitIcon className={styles.icon} aria-hidden="true" />
                  <span>I DON&apos;T FIT</span>
                  <span className="text-[1em]">if...</span>
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
