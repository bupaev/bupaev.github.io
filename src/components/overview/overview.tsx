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
            These three qualities define how I work and become more decisive in the AI era:
          </p>
          <ul className={styles.identityList}>
            <li>
              <strong>Product-Oriented:</strong> I take personal ownership
              of what I build, from first idea to production.
              And I put too much effort into my work not to care how it turns out.
            </li>
            <li>
              <strong>Big-Picture Thinker:</strong> I make decisions
              through full context: business, technical, human. Not gut
              feeling — even smart people fall into{" "}
              <a href="https://pubmed.ncbi.nlm.nih.gov/22663351/" target="_blank">cognitive traps</a>.
            </li>
            <li>
              <strong>Perfectionist:</strong> I care deeply about the
              quality of my craft. If it ships with my name on it,
              the bar has to be high.
            </li>
          </ul>
          <p>
            They matter because they're exactly what AI agents
            lack. Agents can generate code, but they can't own outcomes.
            They can process data, but they can't grasp the full context
            of a business. They can follow instructions, but they can't
            set the bar for quality. That's what I bring to the table.
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
