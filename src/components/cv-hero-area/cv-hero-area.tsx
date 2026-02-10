"use client";

import styles from "./cv-hero-area.module.scss";

interface ImageProps {
  src: string;
  placeholderSrc: string;
}

export interface CvHeroAreaProps {
  desktopImage: ImageProps;
  mobileImage: ImageProps;
}

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 394"><path fill="currentColor" d="M65 151h51v183H65V151Zm91 0h51v14l1 13 2-4c5-8 12-14 21-18 18-7 47-6 65 3 18 10 28 28 32 59l1 116h-52l-1-107c-2-10-6-16-13-20-4-2-9-3-14-3-16 0-25 7-29 20-3 8-3 8-3 61v49h-61V151Z" /><circle cx="90.5" cy="94.5" r="26.5" fill="currentColor" /><path stroke="currentColor" strokeWidth="28" fill="transparent" d="M335 14c24 0 44 20 44 44v277c0 24-20 44-44 44H58c-24 0-44-20-44-44V58c0-24 20-44 44-44h277Z" /></svg>
);

const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 189.5 189.5">
    <path fill="currentColor" d="M152.5 179.5a8 8 0 0 1-4.2-1.3l-47.6-32.3L75 164.3a7.5 7.5 0 0 1-11.6-4.2l-12.8-48.6L4.8 93.9a7.5 7.5 0 0 1 0-14L179 10.7a7.5 7.5 0 0 1 10.3 8.4L160 173.4a7.5 7.5 0 0 1-7.4 6zm-47.6-49 42.4 28.9 22.9-120.2-82.7 79.6 17.2 11.6.2.2zm-35.4-6.3 5.7 21.5 12.3-8.8-16-10.9a7.5 7.5 0 0 1-2-1.8zM28.1 86.8l31.5 12c2.3.9 4 2.8 4.6 5.1l4 15.1c.2-1.7 1-3.3 2.2-4.6l78.8-75.8-121 48.2z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M22 20.007a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V19h18V7.3l-8 7.2-10-9V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v16.007zM4.434 5L12 11.81 19.566 5H4.434zM0 15h8v2H0v-2zm0-5h5v2H0v-2z" />
  </svg>
);

const DownloadIcon = () => (
  <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <polygon fill="currentColor" points="19.4,25 20.9,23.5 23.6,25.3 23.6,17.6 26.4,17.6 26.4,25.3 29.1,23.5 30.6,25 25,30.6" />
    <path fill="currentColor" d="M7.8,30.4l-2.2-2.2V3.8l2.2-2.2h11.3l7.2,7.2v6.6h-2.8v-3h-5.8l-2.2-2.2V4.4H8.4v23.2h10v2.8H7.8z M23,9.6L18.4,5v4.6H23z" />
  </svg>
);

export function CvHeroArea({ desktopImage, mobileImage }: CvHeroAreaProps) {

  return (
    <div className={`${styles.heroArea} hero`}>
      <div className="container">
        <div className="hero-body">
          <div className={styles.text}>
            <div className={`title pt-8 ${styles.title}`}>
              <div className={`${styles.textShapeLimiter} max-md:hidden`} />
              <h1 className="text-5xl leading-tight text-right">
                Hi! I&apos;m Paul Buramensky
              </h1>
              <h2 className="text-4xl leading-tight pt-4 pb-4">
                Front-end engineer and AI-enthusiast with strong UX expertise
              </h2>
              <div className={`${styles.contacts} pt-6`}>
                <div className={'mb-3'}>
                  contact me via
                </div>
                <span className="mr-6">
                  <a href="mailto:mail@paulbu.com">
                    <span className="icon-text">
                      <span className={`icon ${styles.icon}`}>
                        <MailIcon />
                      </span>
                      <span>Email</span>
                    </span>
                  </a>
                </span>
                <span className="mr-6">
                  <a href="https://t.me/bupaev" target="_blank" rel="noopener noreferrer">
                    <span className="icon-text">
                      <span className={`icon ${styles.icon}`} style={{ transform: "skew(-5deg)" }}>
                        <TelegramIcon />
                      </span>
                      <span>Telegram</span>
                    </span>
                  </a>
                </span>
                <span>
                  <a href="https://www.linkedin.com/in/pavel-buramensky/" target="_blank" rel="noopener noreferrer">
                    <span className="icon-text">
                      <span className={`icon ${styles.icon}`}>
                        <LinkedinIcon />
                      </span>
                      <span>LinkedIn</span>
                    </span>
                  </a>
                </span>
                <div className="mb-[9px]">
                  or just 
                </div>
                <a href="/pavel-buramensky-cv.pdf" target="_blank" rel="noopener noreferrer">
                  <span className="icon-text">
                    <span className={`icon ${styles.icon}`}>
                      <DownloadIcon />
                    </span>
                    <span>Download my CV</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.image}>
            <div className={styles.parallelogramImageContainer}>
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={mobileImage.src}
                />
                <img
                  src={desktopImage.placeholderSrc}
                  alt=""
                  aria-hidden="true"
                  className={styles.placeholderImage}
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                />
              </picture>
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={mobileImage.src}
                />
                <img
                  src={desktopImage.src}
                  alt="Paul Buramensky portrait"
                  className={styles.realImage}
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  ref={(img) => {
                    if (img?.complete) img.classList.add(styles.revealed);
                  }}
                  onLoad={(e) => e.currentTarget.classList.add(styles.revealed)}
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
