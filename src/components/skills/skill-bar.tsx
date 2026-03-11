import styles from "./skill-bar.module.scss";

export type SkillLevel = "basic" | "advanced" | "expert";

type SkillBarProps = {
  title: string;
  level: SkillLevel;
};

const levelMap: Record<SkillLevel, number> = {
  basic: 1,
  advanced: 2,
  expert: 3,
};

export function SkillBar({ title, level }: SkillBarProps) {
  const numLevel = levelMap[level];

  return (
    <div
      className={styles.skillBar}
      role="meter"
      aria-label={`${title} skill level`}
      aria-valuemin={1}
      aria-valuemax={3}
      aria-valuenow={numLevel}
      aria-valuetext={level}
    >
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`${styles.segment} ${numLevel >= i ? styles.filled : ""}`}
          data-level={i}
        />
      ))}
    </div>
  );
}
