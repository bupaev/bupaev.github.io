/**
 * Browser detection utilities for performance-sensitive features.
 * SVG Filters and high-frequency repaints (scroll/hover animations) 
 * hit Safari (WebKit) and Firefox (Gecko) harder than Chromium.
 */

export const isSafari = typeof navigator !== "undefined" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const isFirefox = typeof navigator !== "undefined" && /firefox/i.test(navigator.userAgent);

/**
 * Browsers that have known performance constraints with complex SVG filters
 * combined with CSS/JS animations.
 */
export const isSvgPerformanceLimited = isSafari || isFirefox;
