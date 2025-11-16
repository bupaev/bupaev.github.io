import styles from './SkillBar.module.scss'

interface SkillBarProps {
  level: number
}

export default function SkillBar({ level }: SkillBarProps) {
  return (
    <div className={`${styles['skill-bar']} mb-4 mt-1`}>
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className={`${styles.segment} ${level >= i ? styles.filled : ''}`}
        />
      ))}
    </div>
  )
}
