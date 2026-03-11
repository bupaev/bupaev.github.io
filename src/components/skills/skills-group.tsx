import { useState } from "react";
import { SkillBar, type SkillLevel } from "./skill-bar";
import styles from "./skills-group.module.scss";

type SkillItem = {
  title: string;
  level: SkillLevel;
  info?: string;
};

type SkillsGroupProps = {
  title: string;
  info?: string;
  items: SkillItem[];
  className?: string;
};

export function SkillsGroup({ title, info, items, className = "" }: SkillsGroupProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const skillNames = items.map((item) => item.title).join(", ");

  return (
    <div 
      className={`${styles.skillsSection} ${styles.interactiveArea} ${isExpanded ? styles.expanded : ""} ${className}`} 
      onClick={toggleExpand}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleExpand();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
    >
      <div className={styles.groupHeader}>
        <h4 className={styles.groupTitle}>{title}</h4>
        <div className={styles.toggleIcon} aria-hidden="true" />
      </div>
      
      {info && <div className={styles.groupInfo}>{info}</div>}
      
      <div className={styles.collapsedContent}>
        <div className={styles.collapsedContentInner}>
          <p className={styles.skillsList}>{skillNames}</p>
        </div>
      </div>

      <div className={styles.expandedContent}>
        <div className={styles.expandedContentInner}>
          {items.map((item) => (
            <div key={item.title} className={styles.skillItem}>
              <span className={styles.itemTitle}>{item.title}</span>
              <SkillBar title={item.title} level={item.level} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
