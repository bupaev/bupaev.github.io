"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./cv-hero-area.module.scss";

export interface ImageProps {
  src: string;
  placeholderSrc: string;
}

export interface CvHeroImagesProps {
  desktopImage: ImageProps;
  mobileImage: ImageProps;
  darkDesktopImage?: ImageProps;
  darkMobileImage?: ImageProps;
}

// Helper component for controlled images
const ControlledImage = ({
  desktop,
  mobile,
  className,
  priority = false,
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

/**
 * CvHeroImages handles theme-based hero image switching with several optimizations:
 *
 * 1. Hybrid Rendering Strategy:
 *    - SSR/No-JS: Renders a native <picture> tag with media queries for instant LCP based on system preference.
 *    - Hydrated: Switches to React-controlled components to enable manual theme toggling and sequential loading.
 *
 * 2. Sequential Loading:
 *    - The active theme's image loads with high priority (eager).
 *    - The alternate theme's image loads only after the primary image is fully loaded to save bandwidth.
 *
 * 3. Smooth Transitions & Background Bleed Prevention:
 *    - Uses an asymmetric transition strategy to ensure the background is never visible during the switch.
 *    - Switching to Dark (Light -> Dark): Light image (z-index: 1) stays opaque (delayed fade-out) while Dark image (z-index: 2) fades in on top.
 *    - Switching to Light (Dark -> Light): Light image becomes opaque instantly (0s transition) to underlay the fading-out Dark image.
 */
export function CvHeroImages({
  desktopImage,
  mobileImage,
  darkDesktopImage,
  darkMobileImage
}: CvHeroImagesProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [lightImageLoaded, setLightImageLoaded] = useState(false);
  const [darkImageLoaded, setDarkImageLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-color-scheme");
      setIsDark(theme === "dark");
    };
    
    checkTheme();

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

  const lightPriority = !isDark || darkImageLoaded;
  const darkPriority = isDark || lightImageLoaded;

  return (
    <div className={styles.parallelogramImageContainer}>
      {!mounted ? (
        /* SSR / No-JS Fallback */
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
        /* Hydrated: Controlled Images */
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
  );
}
