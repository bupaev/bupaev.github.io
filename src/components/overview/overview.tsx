"use client";
import { useState, useCallback } from "react";
import { Diagram, type ViewMode } from "./index";
import styles from "./overview.module.scss";

export function Overview() {
  const [isGraphicMode, setIsGraphicMode] = useState(true);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setIsGraphicMode(mode === "graphic");
  }, []);

  return (
    <div className={`${styles.overview} container`}>
      <h2 className="title">My Professional Core</h2>
      <div className={styles.columns}>
        <div className={`${styles.textWrapper} content`}>
          <p>
            I am a&nbsp;<strong>Front-end Engineer</strong> with 15+ years of experience.
            I speak design and code – and understand the business behind both.
          </p>
          <p>
            Three principles shape my work:
          </p>
          <ul className={styles.identityList}>
            <li>
              <strong>Product Ownership:</strong> I build products, not features.
              Taking full responsibility for the final result, 
              guiding it from the first idea through to production.
            </li>
            <li>
              <strong>Critical Thinking:</strong> Key decisions need the full context:
              business, technical, human. Backed by unbiased reasoning and a second check
              before acting.
            </li>
            <li>
              <strong>Pragmatic Perfectionism:</strong> While my instinct
              is to perfect everything, experience has taught me to choose
              where quality counts and let the rest be good enough.
            </li>
          </ul>
          <p>
            These principles matter even more as AI becomes<br/>
            an essential part of our routine. It changes how we work but doesn't 
            replace <i>ownership</i>, <i>initiative</i>, and <i>judgment</i>.<br/>
            That stays with engineers.
          </p>
        </div>
        <div className={`${styles.graphicsWrapper} ${isGraphicMode ? styles.graphicMode : ""}`}>
          <p className="content">
            Hover over the diagram to explore my key professional areas and guiding principles.
            <span className={styles.hint}>
              Too complex for a small screen? Switch to text view using the top-right toggle.
            </span>
          </p>
          <Diagram onViewModeChange={handleViewModeChange} />
        </div>
      </div>
    </div>
  );
}
