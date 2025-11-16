'use client'

import { useState, useEffect } from 'react'
import styles from './DarkModeToggle.module.scss'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const getCookie = (name: string): string | undefined => {
      const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'))
      return matches ? matches[1] : undefined
    }

    const savedSchemeValue = getCookie('color-scheme')

    if (savedSchemeValue === undefined) {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
      applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches)
    } else {
      const isDarkMode = savedSchemeValue === 'dark'
      setIsDark(isDarkMode)
      applyTheme(isDarkMode)
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (getCookie('color-scheme')) {
        return
      }
      setIsDark(e.matches)
      applyTheme(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    const handleScroll = () => {
      setIsCompact(window.scrollY > 5)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const applyTheme = (isDark: boolean) => {
    const theme = isDark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-color-scheme', theme)
    // remember user's choice for next six hours
    document.cookie = `color-scheme=${theme}; max-age=21600`
  }

  const handleToggle = () => {
    const newValue = !isDark
    setIsDark(newValue)
    applyTheme(newValue)
  }

  return (
    <div>
      <div
        className={`${styles.darkModeToggle} is-hidden-touch ${isDark ? styles.darkModeEnabled : ''} ${isCompact ? styles.compact : ''}`}
        onClick={handleToggle}
      >
        <div className={styles.slider}>
          <span className={styles.labelDark}>Dark</span>
          <div className={styles.handler}>
            <img className={styles.iconLight} src="/icons/sun.svg" alt="Light mode" />
            <img className={styles.iconDark} src="/icons/moon.svg" alt="Dark mode" />
          </div>
          <span className={styles.labelLight}>Light</span>
        </div>
      </div>
    </div>
  )
}
