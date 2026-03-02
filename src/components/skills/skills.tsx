"use client";

import { SkillsGroup } from "./skills-group";
import styles from "./skills.module.scss";

import { SKILLS_DATA } from "./skills-data";

export function Skills() {
  return (
    <div className={`${styles.skills} container`}>
      <h2 className={`title ${styles.skillsTitle}`}>Skills</h2>
      <div className="content">
        <p>
          We are currently experiencing a tectonic shift in the IT industry. 
          Skills that were critical yesterday and defined your market value, 
          are rapidly losing their relevance today, as AI handles syntax and coding far better than any human.
        </p>
        <p>
          I am fortunate that writing code was never my end goal or sole skill.
          What has always truly interested me is creating real, working products that I can be proud of.
          Nevertheless, the good old list of tools and technologies I possess may still be useful.
        </p>
        <h3>What I can do:</h3>
        <ul className={styles.whatIDoList}>
          <li>
            develop and maintain complex web apps with modern JS frameworks
            (preferably Vue, but I have worked with React and AngularJS too)
          </li>
          <li>
            create reasonably pixel-perfect, adaptive, rich-media web interfaces
            with a nontrivial design
          </li>
          <li>
            make wireframes and user flows based on business requirements,
            create interactive HTML prototypes
          </li>
          <li>
            manage a small team of developers in Agile process. However, I
            prefer coding and UX design more
          </li>
        </ul>
        <h3>Detailed list:</h3>
        <div className={styles.skillsGroupsContainer}>
          {SKILLS_DATA.map((skillGroup) => (
            <SkillsGroup
              key={skillGroup.title}
              title={skillGroup.title}
              items={skillGroup.items}
              className="mb-3 p-3"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
