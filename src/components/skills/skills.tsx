import { SkillsGroup } from "./skills-group";
import { Competencies } from "./competencies";
import styles from "./skills.module.scss";

import { SKILLS_DATA } from "./skills-data";

export function Skills() {
  return (
    <div className={`${styles.skills} container`}>
      <h2 className={`title ${styles.skillsTitle}`}>Skills</h2>
      <div className="content">
        <Competencies />
        <h3>In Details</h3>
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
