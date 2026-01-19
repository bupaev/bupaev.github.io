import styles from "./skill-bar.module.scss";

type SkillBarProps = {
  level: number;
};

export function SkillBar({ level }: SkillBarProps) {
  return (
    <div className={`${styles.skillBar} mb-4 mt-1`}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`${styles.segment} ${level >= i ? styles.filled : ""}`}
          data-level={i}
        />
      ))}
    </div>
  );
}
