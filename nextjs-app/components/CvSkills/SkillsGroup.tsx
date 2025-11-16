import Image from 'next/image'
import SkillBar from './SkillBar'
import styles from './SkillsGroup.module.scss'

interface SkillItem {
  title: string
  info?: string
  level: number
}

interface SkillsGroupProps {
  title: string
  info?: string
  items: SkillItem[]
}

export default function SkillsGroup({ title, info, items }: SkillsGroupProps) {
  return (
    <div className={`${styles['skills-section']} ${styles['interactive-area']}`}>
      <h4 className="is-size-5 has-text-weight-bold mb-4">
        {title}
      </h4>
      {info && (
        <div className="mb-2">
          {info}
        </div>
      )}
      <div>
        {items.map(item => (
          <div key={item.title} className={styles['skill-item']}>
            <span className={styles['item-title']}>{item.title}</span>
            {item.info && (
              <span>
                <i className={styles['info-icon']}>
                  <Image alt="icon" src="/icons/info.svg" width={16} height={16} />
                </i>
                <span className={styles.info}>{item.info}</span>
              </span>
            )}
            <SkillBar level={item.level} />
          </div>
        ))}
      </div>
    </div>
  )
}
