"use client";

import { VennDiagramProfessions } from "./venn-diagram-professions";
import { Diagram } from "./index";
import styles from "./cv-overview.module.scss";

export function CvOverview() {
  return (
    <div className={`${styles.overview} container`}>
      <h2 className="title text-4xl leading-tight">My Professional Core</h2>
      <div className={styles.strategicIdentity}>
        <div className={styles.diagramColumn}>
          <Diagram />
        </div>
        <div className={styles.contentColumn}>
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
      <div className="columns">
        <div className="column">
          <div className="content">
            <figure className={styles.diagramContainer}>
              <VennDiagramProfessions />
            </figure>
            <p>
              I&apos;ve been doing front-end development for over a decade,
              mostly for complex web applications, like{" "}
              <a
                href="https://www.bandlab.com/creation-features"
                target="_blank"
                rel="noopener noreferrer"
              >
                multitrack audio workstation
              </a>{" "}
              or{" "}
              <a
                href="https://www.holmusk.com/solutions"
                target="_blank"
                rel="noopener noreferrer"
              >
                electronic health record system
              </a>
              . Besides, I really enjoy creating stylish web-sites, fancy
              CSS/SVG animations and data visualization. No matter what I do, my
              ultimate goal is to deliver a first-class user experience.
            </p>
            <p>I achieve this goal through expertise in the following areas:</p>
            <div className={styles.sectionWithDelimiter}>
              <p>
                <span className={`${styles.bullet} xl:hidden`} />
                <strong>Front-end engineering</strong> as my main
                specialization: building scalable, maintainable front-end
                architectures, writing clean, readable code and making robust
                interface layouts (reasonably pixel-perfect) using modern
                JavaScript frameworks, advanced web APIs, and everything else
                that you can find in trendy FE tech stack.
              </p>
              <p className="mb-4">
                <span className={`${styles.bullet} xl:hidden`} />
                <strong>Visual design and user experience</strong> as an
                important addition. My longstanding interest in photography and
                behavioral psychology gave me a good fundamental basis; ten
                years of creating visual interfaces in close cooperation with
                professional UI/UX designers gave me a practical knowledge.
              </p>
            </div>
            <p>
              This combination of skills and knowledge, that isn&apos;t only
              technical but also creative, helps me a lot in my work: it gives
              me the ability to implement complex functionality from an idea to
              a real product, find an optimal balance between aesthetics,
              efforts and performance, effectively communicate with design team
              and even carry out tasks of UX design if needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
