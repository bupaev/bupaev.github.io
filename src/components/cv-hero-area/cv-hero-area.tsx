"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./cv-hero-area.module.scss";

interface ImageProps {
  src: string;
  placeholderSrc: string;
}

export interface CvHeroAreaProps {
  desktopImage: ImageProps;
  mobileImage: ImageProps;
  darkDesktopImage?: ImageProps;
  darkMobileImage?: ImageProps;
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

// Helper component for controlled images to reduce duplication
const ControlledImage = ({
  desktop,
  mobile,
  className,
  priority = false, // If true, load immediately/eagerly
  onLoad,
}: {
  desktop: ImageProps;
  mobile: ImageProps;
  className: string;
  priority?: boolean;
  onLoad?: () => void;
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // If priority is false, we want to delay loading until permitted (handled by parent passing priority=true eventually)
  // BUT: standard HTML behavior is that if src is present, it loads.
  // So we only render the "real" picture sources if priority is true.
  
  return (
    <div className={className}>
      <picture>
        <source media="(max-width: 768px)" srcSet={mobile.placeholderSrc} />
        <img
          src={desktop.placeholderSrc}
          alt=""
          aria-hidden="true"
          className={`${styles.placeholderImage} ${loaded ? styles.hidden : ""}`}
        />
      </picture>
      
      {priority && (
        <picture>
          <source media="(max-width: 768px)" srcSet={mobile.src} />
          <img
            ref={imgRef}
            src={desktop.src}
            alt="Paul Buramensky portrait"
            className={`${styles.realImage} ${loaded ? styles.revealed : ""}`}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="sync"
            onLoad={() => {
              setLoaded(true);
              onLoad?.();
            }}
          />
        </picture>
      )}
    </div>
  );
};


export function CvHeroArea({ 
  desktopImage, 
  mobileImage,
  darkDesktopImage,
  darkMobileImage 
}: CvHeroAreaProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initial theme check
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-color-scheme");
      setIsDark(theme === "dark");
    };
    
    checkTheme();

    // Observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-color-scheme") {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-color-scheme"],
    });

    return () => observer.disconnect();
  }, []);

  // When theme changes, if the new primary image isn't loaded, we might want to reset primaryLoaded?
  // Logic: 
  // If I am Dark, Dark image is Primary. Light image is Secondary.
  // If I switch to Light, Light image becomes Primary. Dark image becomes Secondary.
  // If Light was already loaded (from previous visit or background load), great.
  // If not, it becomes priority.
  // The ControlledImage component handles its own "loaded" state.
  // We just need to tell which one is allowed to load first.
  
  // Strategy:
  // "Primary" is the one matching current theme. PROPS: priority=true.
  // "Secondary" is the other. PROPS: priority=primaryLoaded.
  
  // Wait! If I switch theme, "primaryLoaded" might refer to the OLD primary.
  // We need distinct "lightLoaded" and "darkLoaded" states at this level to coordinate?
  // No, `ControlledImage` handles the actual loading of the image resource.
  // The prompt asked: "Unused image has to be loaded with lower priority, only when visible image are loaded".
  // So:
  // Light Image Priority = (isLight) OR (isDark AND darkImageLoaded)
  // Dark Image Priority = (isDark) OR (isLight AND lightImageLoaded)

  const [lightImageLoaded, setLightImageLoaded] = useState(false);
  const [darkImageLoaded, setDarkImageLoaded] = useState(false);

  const lightPriority = !isDark || darkImageLoaded;
  const darkPriority = isDark || lightImageLoaded;

  return (
    <div className={`${styles.heroArea}`}>
      <div className={`container ${styles.heroBody}`}>
          <div className={`${styles.textWrapper} pt-8`}>
              <div className={`${styles.textShapeLimiter} max-md:hidden`} />
              <h1 className={styles.heroHeading}>
                Hi! I&apos;m Paul Buramensky
              </h1>
              <h2 className={styles.heroSubheading}>
                Lead front-end engineer<br /> with strong UX expertise<br /> and AI-enthusiast
              </h2>
              <div className={`${styles.contacts} pt-6`}>
                <div className={'mb-2'}>
                  contact me via
                </div>
                <span>
                  <a href="mailto:mail@paulbu.com">
                    <span className="icon-text">
                      <span className={`icon ${styles.icon}`}>
                        <MailIcon />
                      </span>
                      <span>Email</span>
                    </span>
                  </a>
                </span>
                <span>
                  <a href="https://t.me/bupaev" target="_blank" rel="noopener noreferrer">
                    <span className="icon-text">
                      <span className={`icon ${styles.icon}`} style={{ transform: "skew(0)" }}>
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
                <div className="mb-[6px]">
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
          <div className={styles.mediaWrapper}>
            <div className={styles.parallelogramImageContainer}>
              {!mounted ? (
                /* SSR / No-JS Fallback: Use native picture with media queries */
                /* This ensures LCP is fast and correct based on system pref */
                <>
                {darkDesktopImage && darkMobileImage ? (
                   <picture>
                     {/* Dark Mode Sources */}
                     <source 
                       media="(prefers-color-scheme: dark) and (max-width: 768px)" 
                       srcSet={darkMobileImage.src} 
                     />
                     <source 
                       media="(prefers-color-scheme: dark)" 
                       srcSet={darkDesktopImage.src} 
                     />
                     
                     {/* Light Mode Sources (Default) */}
                     <source 
                        media="(max-width: 768px)" 
                        srcSet={mobileImage.src} 
                     />
                     <img
                       src={desktopImage.src}
                       alt="Paul Buramensky portrait"
                       className={styles.realImage + ' ' + styles.revealed}
                       loading="eager"
                       fetchPriority="high"
                       decoding="sync"
                     />
                   </picture>
                ) : (
                  <picture>
                    <source
                      media="(max-width: 768px)"
                      srcSet={mobileImage.src}
                    />
                    <img
                      src={desktopImage.src}
                      alt="Paul Buramensky portrait"
                      className={styles.realImage + ' ' + styles.revealed}
                      loading="eager"
                      fetchPriority="high"
                      decoding="sync"
                    />
                  </picture>
                )}
                </>
              ) : (
                /* Hydrated: Controlled Images with Manual Toggle Support */
                <>
                  <ControlledImage 
                    desktop={desktopImage} 
                    mobile={mobileImage} 
                    className={styles.lightImage}
                    priority={lightPriority}
                    onLoad={() => setLightImageLoaded(true)}
                  />
                  {darkDesktopImage && darkMobileImage && (
                    <ControlledImage 
                      desktop={darkDesktopImage} 
                      mobile={darkMobileImage} 
                      className={styles.darkImage}
                      priority={darkPriority}
                      onLoad={() => setDarkImageLoaded(true)}
                    />
                  )}
                </>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}
