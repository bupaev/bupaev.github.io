import Image from "next/image";
import { SkillBar } from "./skill-bar";
import styles from "./skills-group.module.scss";

type SkillItem = {
  title: string;
  level: number;
  info?: string;
};

type SkillsGroupProps = {
  title: string;
  info?: string;
  items: SkillItem[];
  className?: string;
};

export function SkillsGroup({ title, info, items, className = "" }: SkillsGroupProps) {
  return (
    <div className={`${styles.skillsSection} ${styles.interactiveArea} ${className}`}>
      <h4 className="is-size-5 has-text-weight-bold mb-4">{title}</h4>
      {info && <div className="mb-2">{info}</div>}
      <div>
        {items.map((item) => (
          <div key={item.title} className={styles.skillItem}>
            <span className={styles.itemTitle}>{item.title}</span>
            {item.info && (
              <span>
                <i className={styles.infoIcon}>
                  <Image
                    alt="icon"
                    src="/icons/info.svg"
                    width={16}
                    height={16}
                  />
                </i>
                <span className={styles.info}>{item.info}</span>
              </span>
            )}
            <SkillBar level={item.level} />
          </div>
        ))}
      </div>
    </div>
  );
}
