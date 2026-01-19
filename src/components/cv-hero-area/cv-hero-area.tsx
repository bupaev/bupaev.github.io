"use client";

import { useRef, useState, useEffect } from "react";

import styles from "./cv-hero-area.module.scss";

interface ImageProps {
  src: string;
  placeholderSrc: string;
}

export interface CvHeroAreaProps {
  desktopImage: ImageProps;
  mobileImage: ImageProps;
}

function LinkedinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
      <path
        fill="currentColor"
        d="M 117.88 1024 C88.45,1019.70 59.30,1004.57 38.18,982.63 C14.95,960.57 2.11,934.51 -1.97,905.16 C-3.82,891.78 -3.82,132.32 -1.97,118.92 C6.56,57.62 55.62,8.56 114.94,-0.97 C128.32,-2.82 887.78,-2.82 901.16,-0.97 C915.51,1.03 930.53,5.75 944.24,12.55 C984.68,32.63 1013.93,72.88 1020.06,116.91 C1020.95,123.29 1021.35,248.37 1021.35,511.65 C1021.35,860.97 1021.17,897.03 1019.35,907.57 C1014.62,935.17 1002.62,959.04 983.13,979.56 C961.02,1002.86 932.20,1017.81 901.16,1022.13 C889.48,1023.76 123.99,1023.71 112.83,1021.08 ZM 897.97 944.53 C919.92,938.81 937.26,921.05 941.69,899.78 C943.62,890.50 943.62,134.03 941.69,124.75 C938.35,108.75 925.95,92.21 912.07,85.27 C896.67,77.56 927.75,78.12 509.00,78.12 C170.26,78.12 126.54,78.33 120.10,80.01 C98.76,85.58 82.51,101.82 76.95,123.16 C75.27,129.59 75.06,173.31 75.06,512.00 C75.06,929.12 74.55,899.85 81.97,914.49 C86.40,923.20 97.10,934.11 105.77,938.74 C120.73,946.72 89.08,946.13 508.80,946.21 C848.25,946.29 891.85,946.09 897.97,944.53 ZM 156.54 630.18 L 156.54 393.19 L 235.44 393.19 L 314.34 393.19 L 314.34 630.18 L 314.34 867.16 L 235.44 867.16 L 156.54 867.16 L 156.54 630.18 ZM 393.19 630.18 L 393.19 393.19 L 472.09 393.19 L 551.00 393.19 L 551.00 427.74 C551.00,446.74 551.42,462.27 551.93,462.24 C552.43,462.23 555.35,458.01 558.40,452.87 C570.09,433.20 590.10,415.83 611.87,406.45 C658.66,386.26 734.74,389.38 781.03,413.36 C828.77,438.06 854.20,484.95 863.82,565.98 C865.68,581.60 866.00,601.35 866.42,725.33 L 866.89 866.99 L 787.95 866.99 L 709.01 866.99 L 708.60 733.98 C708.22,612.89 707.99,599.91 706.02,590.00 C700.61,562.74 690.56,547.35 672.09,538.08 C662.76,533.40 651.33,531.29 635.17,531.27 C594.42,531.20 569.66,547.41 558.94,581.21 C551.91,603.37 551.94,602.54 551.40,740.03 L 550.89 867.00 L 472.04 867.00 L 393.19 867.00 L 393.19 630.18 ZM 218.18 311.97 C196.17,307.25 175.04,290.67 165.26,270.45 C153.65,246.48 153.67,222.81 165.31,201.18 C178.06,175.32 206.19,157.99 235.44,157.99 C272.00,157.99 305.13,184.74 312.55,220.27 C324.31,276.44 274.36,326.01 218.18,311.97 Z"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 189.473 189.473"
    >
      <path
        fill="currentColor"
        d="M152.531,179.476c-1.48,0-2.95-0.438-4.211-1.293l-47.641-32.316l-25.552,18.386c-2.004,1.441-4.587,1.804-6.914,0.972
		c-2.324-0.834-4.089-2.759-4.719-5.146l-12.83-48.622L4.821,93.928c-2.886-1.104-4.8-3.865-4.821-6.955
		c-0.021-3.09,1.855-5.877,4.727-7.02l174.312-69.36c0.791-0.336,1.628-0.53,2.472-0.582c0.302-0.018,0.605-0.018,0.906-0.001
		c1.748,0.104,3.465,0.816,4.805,2.13c0.139,0.136,0.271,0.275,0.396,0.42c1.11,1.268,1.72,2.814,1.835,4.389
		c0.028,0.396,0.026,0.797-0.009,1.198c-0.024,0.286-0.065,0.571-0.123,0.854L159.898,173.38c-0.473,2.48-2.161,4.556-4.493,5.523
		C154.48,179.287,153.503,179.476,152.531,179.476z M104.862,130.579l42.437,28.785L170.193,39.24l-82.687,79.566l17.156,11.638
		C104.731,130.487,104.797,130.533,104.862,130.579z M69.535,124.178l5.682,21.53l12.242-8.809l-16.03-10.874
		C70.684,125.521,70.046,124.893,69.535,124.178z M28.136,86.782l31.478,12.035c2.255,0.862,3.957,2.758,4.573,5.092l3.992,15.129
		c0.183-1.745,0.974-3.387,2.259-4.624L149.227,38.6L28.136,86.782z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M22 20.007a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V19h18V7.3l-8 7.2-10-9V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v16.007zM4.434 5L12 11.81 19.566 5H4.434zM0 15h8v2H0v-2zm0-5h5v2H0v-2z"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      version="1.2"
      baseProfile="tiny"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <polygon
        fill="currentColor"
        points="19.4,25 20.9,23.5 23.6,25.3 23.6,17.6 26.4,17.6 26.4,25.3 29.1,23.5 30.6,25 25,30.6"
      />
      <path
        fill="currentColor"
        d="M7.8,30.4l-2.2-2.2V3.8l2.2-2.2h11.3l7.2,7.2v6.6h-2.8v-3h-5.8l-2.2-2.2V4.4H8.4v23.2h10v2.8H7.8z M23,9.6L18.4,5v4.6H23z"
      />
    </svg>
  );
}

export function CvHeroArea({ desktopImage, mobileImage }: CvHeroAreaProps) {
  const [desktopImageLoaded, setDesktopImageLoaded] = useState(false);
  const [mobileImageLoaded, setMobileImageLoaded] = useState(false);
  const desktopImgRef = useRef<HTMLImageElement>(null);
  const mobileImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (desktopImgRef.current && desktopImgRef.current.complete) {
      setDesktopImageLoaded(true);
    }
    if (mobileImgRef.current && mobileImgRef.current.complete) {
      setMobileImageLoaded(true);
    }
  }, []);

  return (
    <div className={`${styles.heroArea} hero`}>
      <div className="container">
        <div className="hero-body">
          <div className="columns">
            <div
              className={`${styles.leftColumn} column text-right max-lg:w-3/5 max-lg:flex-none`}
            >
              <div
                className={`${styles.parallelogramImageContainer} md:hidden`}
              >
                <img
                  src={mobileImage.placeholderSrc}
                  alt=""
                  aria-hidden="true"
                  style={{ filter: "blur(20px)" }}
                />
                <img
                  ref={mobileImgRef}
                  src={mobileImage.src}
                  alt="Paul Buramensky portrait"
                  className={styles.hideableImage}
                  data-loaded={mobileImageLoaded}
                  onLoad={() => setMobileImageLoaded(true)}
                />
              </div>
              <h1 className={`title pt-8 mb-6 ${styles.title}`}>
                <div className={`${styles.textShapeLimiter} max-md:hidden`} />
                <span className="text-5xl leading-tight text-right">
                  Hi! I&apos;m Paul Buramensky
                </span>
                <p className="text-4xl leading-tight pt-4">
                  Front-end engineer and AI-enthusiast with strong UX expertise
                </p>
              </h1>
              <p className={`${styles.contacts} pt-6`}>
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
                  <a
                    href="https://t.me/bupaev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="icon-text">
                      <span className={`icon ${styles.icon}`}>
                        <TelegramIcon />
                      </span>
                      <span>Telegram</span>
                    </span>
                  </a>
                </span>
                <span>
                  <a
                    href="https://www.linkedin.com/in/pavel-buramensky/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="icon-text">
                      <span className={`icon ${styles.icon}`}
                        style={{ transform: "scale(0.9)" }} >
                        <LinkedinIcon />
                      </span>
                      <span>LinkedIn</span>
                    </span>
                  </a>
                </span>
                <span className="md:block">
                  <span className="mr-3 max-md:hidden md:inline-block align-top -mt-[0.25em]">
                    or just
                  </span>
                  <a
                    href="/pavel-buramensky-cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="icon-text">
                      <span className={`icon ${styles.icon}`}>
                        <DownloadIcon />
                      </span>
                      <span>Download my CV</span>
                    </span>
                  </a>
                </span>
              </p>
            </div>
            <div className="column hidden md:block py-0 max-lg:w-2/5 max-lg:flex-none">
              <div className={styles.parallelogramImageContainer}>
                <img
                  src={desktopImage.placeholderSrc}
                  alt=""
                  aria-hidden="true"
                  style={{ filter: "blur(20px)" }}
                />
                <img
                  ref={desktopImgRef}
                  src={desktopImage.src}
                  alt="Paul Buramensky portrait"
                  className={styles.hideableImage}
                  data-loaded={desktopImageLoaded}
                  onLoad={() => setDesktopImageLoaded(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
