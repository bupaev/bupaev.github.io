"use client";
import { Diagram } from "./index";
import styles from "./overview.module.scss";

export function Overview() {
  return (
    <div className={`${styles.overview} container`}>
      <h2 className="title text-4xl leading-tight">My Professional Core</h2>
      <div className={styles.overviewContent}>
        <div className={styles.diagramWrapper}>
          <Diagram />
        </div>
        <div className={styles.textWrapper}>
          In 3 words I'm <strong>product-oriented reasonable perfectionist</strong>.
          <br />
          I am a Product Engineer who acts as a diplomat between stakeholders,
          a guardian of quality, and a pragmatic architect.
          Every aspect of my professional core—from AI to Leadership -
          is subservient to one single goal: building a great product.
          <br />
          <br />
          <ul className={styles.identityList}>
            <li>
              <strong>Technical Orchestrator:</strong> I don&apos;t just write
              code; I &quot;define the melody,&quot; managing complex systems
              where AI agents handle rote work.
            </li>
            <li>
              <strong>T-Shaped Leader:</strong> Deep vertical expertise in
              Front-End combined with broad horizontal reach across UX, Backend,
              and Business Analysis.
            </li>
            <li>
              <strong>Critical Systems Thinker:</strong> I validate AI output
              and business requirements, acting as the safety layer that
              questions assumptions.
            </li>
            <li>
              <strong>Human-Centric Engineer:</strong> Drawing on behavioral
              psychology, I design solutions focused on the human
              element—whether it&apos;s the end-user or the developer reading my
              code.
            </li>
            <li>
              <strong>High-Leverage Engineer:</strong> Using AI and automation
              as a force multiplier to deliver value far beyond what a single
              individual usually produces.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
