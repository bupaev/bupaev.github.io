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
              <strong>Product Ownership:</strong> I build products,
              not features. Responsible for the result and staying
              with it from first idea to production.
            </li>
            <li>
              <strong>Critical Thinking:</strong> Biased decisions
              are expensive. So every decision needs the full context:
              business, technical, human, and a second check before
              committing.
            </li>
            <li>
              <strong>Pragmatic Perfectionism:</strong> The right details
              deserve real attention. The rest should be solid and
              get out of the way. Good work feels deliberate and
              properly finished.
            </li>
          </ul>
          <p>
            AI tools accelerate execution, and I use them daily.
            But they do not replace the judgment to weigh trade-offs
            or the ownership to decide what "done" looks like.
            That responsibility stays with the engineer.
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
