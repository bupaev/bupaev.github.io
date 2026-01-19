"use client";

import { useState } from "react";

import styles from "./cv-hero-area.module.scss";

import portraitDesktop from "./images/portrait-1-desktop.jpg";
import portraitMobile from "./images/portrait-1-mobile-2x.jpg";

function LinkedinIcon() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19.9 19.8"
    >
      <path
        fill="currentColor"
        d="M2,18.6c-0.4,0-0.7-0.3-0.7-0.7v-16c0-0.4,0.3-0.7,0.7-0.7h16c0.4,0,0.7,0.3,0.7,0.7v16c0,0.4-0.3,0.7-0.7,0.7H2z
		 M2.7,17.2h14.6V2.6H2.7V17.2z M13.8,15.1v-4c0-1.1-0.9-2-2-2c-1.1,0-2,0.9-2,2v4H8.3V8.2h1.4v0.8l0.5-0.5C10.8,8,11.4,7.7,12,7.7
		c1.8,0,3.2,1.5,3.2,3.5v4H13.8z M4.8,15.1V8.2h1.4v6.9H4.8z M5.5,6.6c-0.7,0-1.2-0.5-1.2-1.2s0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2
		S6.2,6.6,5.5,6.6z"
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

export function CvHeroArea() {
  const [desktopImageLoaded, setDesktopImageLoaded] = useState(false);
  const [mobileImageLoaded, setMobileImageLoaded] = useState(false);

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
                  src={portraitMobile.src}
                  alt="Paul Buramensky portrait"
                  className={`${styles.image} ${mobileImageLoaded ? styles.loaded : ""}`}
                  onLoad={() => setMobileImageLoaded(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h1 className={`title pt-8 mb-6 ${styles.title}`}>
                <div
                  className={`${styles.textShapeLimiter} max-md:hidden`}
                />
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
                      <span className={`icon ${styles.icon}`}>
                        <LinkedinIcon />
                      </span>
                      <span>LinkedIn</span>
                    </span>
                  </a>
                </span>
                <span className="md:block">
                  <span className="mr-3 max-md:hidden md:inline-block align-top -mt-[0.25em]">
                    also you can
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
                  src={portraitDesktop.src}
                  alt="Paul Buramensky portrait"
                  className={`${styles.image} ${desktopImageLoaded ? styles.loaded : ""}`}
                  onLoad={() => setDesktopImageLoaded(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
