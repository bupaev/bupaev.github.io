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
            I am a&nbsp;<strong>Front-end Engineer</strong> with 15+ years of experience. I speak design and code — and I understand the business behind both.
          </p>
          <p>
            Three qualities shape how I work and how I collaborate with teams:
          </p>
          <ul className={styles.identityList}>
            <li>
              <strong>Product-Oriented:</strong> I care about outcomes,
              not just output. I stay close to the product from first
              idea to production — and I work best with people who do
              the same.
            </li>
            <li>
              <strong>Big-Picture Thinker:</strong> I try to make
              decisions through full context: business, technical, human.
              That means listening first — because we all have{" "}
              <a href="https://pubmed.ncbi.nlm.nih.gov/22663351/" target="_blank">blind spots</a>.
            </li>
            <li>
              <strong>Pragmatic Perfectionist:</strong> I hold my work to a high
              standard and keep raising it. Good enough ships — but
              I want to learn from every release what "better" looks
              like next time.
            </li>
          </ul>
          <p>
            In the AI era these qualities matter more, not less.
            AI is a powerful tool I use daily, but the work still
            needs someone who owns the outcome, weighs the trade-offs,
            and knows when the bar has been met. That's the part
            I enjoy most.
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
