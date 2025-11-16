'use client'

import { useRef, useState, useEffect, CSSProperties } from 'react'
import styles from './page.module.scss'
import DarkModeToggle from '@/components/DarkModeToggle/DarkModeToggle'
import CvVerticalMenu from '@/components/CvVerticalMenu/CvVerticalMenu'
import CvHeroArea from '@/components/CvHeroArea/CvHeroArea'
import CvOverview from '@/components/CvOverview/CvOverview'
import CvSkills from '@/components/CvSkills/CvSkills'
import CvExperience from '@/components/CvExperience/CvExperience'
import CvEducation from '@/components/CvEducation/CvEducation'

export default function CvPage() {
  const heroAreaRef = useRef<HTMLElement>(null)
  const [heroAreaHeight, setHeroAreaHeight] = useState(0)
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({})

  useEffect(() => {
    // On mobile screen we scroll then fix vertical menu.
    // Sadly position sticky isn't suitable for VerticalMenu in this case so make it in old-fashioned way.
    if (heroAreaRef.current) {
      setHeroAreaHeight(heroAreaRef.current.clientHeight)
    }

    const handleResize = () => {
      if (heroAreaRef.current) {
        setHeroAreaHeight(heroAreaRef.current.clientHeight)
      }
      handleScroll()

      if (window.innerWidth <= 768) {
        window.addEventListener('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
        setMenuStyle({})
      }
    }

    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        const newStyle: CSSProperties = window.scrollY < heroAreaHeight
          ? { top: `${heroAreaHeight}px`, position: 'absolute' as const }
          : {}
        setMenuStyle(newStyle)
      }
    }

    if (window.innerWidth <= 768) {
      handleScroll()
    }
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [heroAreaHeight])

  return (
    <div>
      <DarkModeToggle />
      <CvVerticalMenu style={menuStyle} />
      <section
        id="hero-area"
        ref={heroAreaRef}
        className="anchor-for-navigation"
        style={{ position: 'sticky' }}
      >
        <CvHeroArea />
      </section>
      <section
        id="overview"
        className="section anchor-for-navigation is-primary"
      >
        <CvOverview />
      </section>
      <section
        id="skills"
        className={`section anchor-for-navigation ${styles.withBackground}`}
      >
        <CvSkills />
      </section>
      <section
        id="experience"
        className={`section anchor-for-navigation ${styles.withBackground}`}
      >
        <CvExperience />
      </section>
      <section
        id="education"
        className={`section anchor-for-navigation ${styles.withBackground}`}
      >
        <CvEducation />
      </section>
    </div>
  )
}
