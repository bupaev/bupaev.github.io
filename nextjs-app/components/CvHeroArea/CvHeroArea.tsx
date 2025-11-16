import Image from 'next/image'
import { LinkedinIcon, TelegramIcon, MailIcon, DownloadIcon } from '../icons'
import styles from './CvHeroArea.module.scss'

export default function CvHeroArea() {
  return (
    <div className={`${styles.heroArea} hero`}>
      <div className="container">
        <div className="hero-body">
          <div className="columns">
            <div className={`left-column column has-text-right is-three-fifths-touch ${styles.leftColumn}`}>
              <div className={`${styles.parallelogramImageContainer} is-hidden-tablet`}>
                <Image
                  src="/pics/portrait-1-mobile-2x.jpg"
                  alt="Pavel Buramensky"
                  width={250}
                  height={600}
                  placeholder="blur"
                  blurDataURL="/pics/portrait-1-mobile-placeholder.jpg"
                />
              </div>
              <h1 className={`title pt-6 ${styles.title}`}>
                <div className={`${styles.textShapeLimiter} is-hidden-mobile`} />
                <span className="is-size-1 has-text-right">Hi! I&#39;m Paul Buramensky</span>
                <p className="is-size-2 pt-4">
                  I&apos;m a front-end developer who cares about user experience and tries to make the world a better place
                </p>
              </h1>
              <p className={`${styles.contacts} pt-5`}>
                <span className="mr-5">
                  <a href="mailto:mail@paulbu.com">
                    <span className="icon-text">
                      <span className="icon">
                        <MailIcon />
                      </span>
                      <span>Email</span>
                    </span>
                  </a>
                </span>
                <span className="mr-5">
                  <a href="https://t.me/bupaev">
                    <span className="icon-text">
                      <span className="icon">
                        <TelegramIcon />
                      </span>
                      <span>Telegram</span>
                    </span>
                  </a>
                </span>
                <span>
                  <a href="https://www.linkedin.com/in/pavel-buramensky/">
                    <span className="icon-text">
                      <span className="icon">
                        <LinkedinIcon />
                      </span>
                      <span>LinkedIn</span>
                    </span>
                  </a>
                </span>
                <span className="is-block-tablet">
                  <span className={`${styles.verticalAlignHack} mr-2 is-hidden-mobile`}>also you can</span>
                  <a href="/pavel-buramensky-cv.pdf" target="_blank" rel="noopener noreferrer">
                    <span className="icon-text">
                      <span className="icon">
                        <DownloadIcon />
                      </span>
                      <span>Download my CV</span>
                    </span>
                  </a>
                </span>
              </p>
            </div>
            <div className="column is-hidden-mobile">
              <div className={styles.parallelogramImageContainer}>
                <Image
                  src="/pics/portrait-1-desktop.jpg"
                  alt="Pavel Buramensky"
                  width={500}
                  height={550}
                  placeholder="blur"
                  blurDataURL="/pics/portrait-1-desktop-placeholder.jpg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
