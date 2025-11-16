import GoToTop from './GoToTop'
import styles from './TheFooter.module.scss'

export default function TheFooter() {
  return (
    <footer className={`footer is-size-5 ${styles.footer}`}>
      <GoToTop className={styles.goToTopLeft} />
      <GoToTop className={styles.goToTopRight} />
      <div className={styles.text}>
        <span>
          Made with <a href="https://github.com/bupaev/bupaev.github.io" target="_blank" rel="noopener noreferrer">love and NuxtJS</a>
        </span>
      </div>
    </footer>
  )
}
