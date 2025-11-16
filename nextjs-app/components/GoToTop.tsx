'use client'

import styles from './GoToTop.module.scss'

export default function GoToTop({ className = '' }: { className?: string }) {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className={`${styles.goToTop} ${className}`} onClick={goToTop}>
      <div className={styles.arrow} />
      <div className={styles.arrow} />
      <div className={styles.arrow} />
    </div>
  )
}
