"use client";

import { VennDiagramProfessions } from "./venn-diagram-professions";
import styles from "./cv-overview.module.scss";

export function CvOverview() {
  return (
    <div className={`${styles.overview} container`}>
      <h2 className="title is-2">Overview</h2>
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
                <span className={`${styles.bullet} is-hidden-widescreen`} />
                <strong>Front-end engineering</strong> as my main
                specialization: building scalable, maintainable front-end
                architectures, writing clean, readable code and making robust
                interface layouts (reasonably pixel-perfect) using modern
                JavaScript frameworks, advanced web APIs, and everything else
                that you can find in trendy FE tech stack.
              </p>
              <p className="mb-4">
                <span className={`${styles.bullet} is-hidden-widescreen`} />
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
