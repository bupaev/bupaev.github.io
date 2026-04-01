"use client";

import { useEffect, useState, useRef, type RefObject } from "react";
import { useStripeGeometry } from "./use-stripe-geometry";
import styles from "./interactive-stripes.module.scss";

/** Interval between random idle wave splashes in ms */
const IDLE_INTERVAL_MS = 3000;
/** Number of neighboring stripes to animate during idle splash */
const IDLE_WAVE_RADIUS = 30;
/** Max fill intensity percentage for idle splash peaks */
const IDLE_WAVE_PEAK_INTENSITY_PERCENT = 30;

/** Number of neighboring stripes to animate during manual click splash */
const SPLASH_WAVE_RADIUS = 50;
/** Delay between each wave step during splash in ms */
const SPLASH_WAVE_STEP_DELAY_MS = 64;
/** Max fill intensity percentage for moving splash wave peaks */
const SPLASH_WAVE_PEAK_INTENSITY_PERCENT = 50;
/** Total duration of the physical drop bounce animation */
const SPLASH_WAVE_ANIMATION_DURATION_MS = 1500;

type SplashOffset = {
  offset: number;
  radius: number;
  intensity: number;
};

type InteractiveStripesProps = {
  containerRef: RefObject<HTMLElement | null>;
};

/**
 * SVG overlay that renders interactive diagonal stripes over the hero area.
 * The SVG itself is the positioned container (no wrapper div).
 * CSS handles the hover blinking effect.
 *
 * - Idle: random stripe flashes yellow once per second (instant snap)
 * - Hover: hovered stripe blinks at 2Hz like a CRT cursor (pure CSS)
 * - Touch: splash effect radiating from touch point
 */
export function InteractiveStripes({ containerRef }: InteractiveStripesProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const geometry = useStripeGeometry(svgRef);
  const [splashIndices, setSplashIndices] = useState<Map<number, SplashOffset>>(new Map());
  const splashTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { count, positions, containerWidth, containerHeight, stripeLength, overflow } = geometry;

  // Signal to CSS: hide the fallback ::after gradient once the SVG is ready.
  // containerRef points to .heroArea where ::after lives.
  useEffect(() => {
    if (count === 0 || containerWidth === 0) return;

    const el = containerRef.current;
    if (!el) return;

    el.dataset.stripesReady = "";
    return () => {
      delete el.dataset.stripesReady;
    };
  }, [containerRef, count, containerWidth]);

  // Idle splash: pick a random stripe every few seconds
  useEffect(() => {
    if (count === 0) return;

    const interval = setInterval(() => {
      // Don't trigger idle splash if the user is currently hovering the SVG
      if (svgRef.current && svgRef.current.matches(":hover")) return;

      // Use average of 3 random numbers for a bell-curve distribution centered around 0.5
      // This increases the probability of idle splashes happening near the middle.
      const gaussianRandom = (Math.random() + Math.random() + Math.random()) / 3;
      const randomIndex = Math.floor(gaussianRandom * count);
      triggerSplash(randomIndex, IDLE_WAVE_RADIUS, IDLE_WAVE_PEAK_INTENSITY_PERCENT);
    }, IDLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [count]);

  // Removed legacy window tracker in favor of synthetic React events below.

  /**
   * Triggers a splash effect: the center stripe flashes,
   * then neighboring stripes light up with decreasing intensity and increasing delay.
   */
  const triggerSplash = (
    centerIndex: number,
    radius = SPLASH_WAVE_RADIUS,
    peakIntensity = SPLASH_WAVE_PEAK_INTENSITY_PERCENT
  ) => {
    const newSplash = new Map<number, SplashOffset>();
    for (let offset = -radius; offset <= radius; offset++) {
      const idx = centerIndex + offset;
      if (idx >= 0 && idx < count) {
        newSplash.set(idx, { offset: Math.abs(offset), radius, intensity: peakIntensity });
      }
    }

    setSplashIndices(newSplash);

    // Clear any existing active timer to prevent premature wave cutoffs
    if (splashTimerRef.current) clearTimeout(splashTimerRef.current);

    splashTimerRef.current = setTimeout(() => {
      setSplashIndices(new Map());
      splashTimerRef.current = null;
    }, SPLASH_WAVE_ANIMATION_DURATION_MS + radius * SPLASH_WAVE_STEP_DELAY_MS);
  };

  /**
   * Returns the CSS class name(s) for a stripe based on its current state.
   */
  const getStripeClassName = (index: number): string => {
    const classes = [styles.stripe];

    if (splashIndices.has(index)) {
      // 1. Splash wave takes absolute priority
      const { offset } = splashIndices.get(index)!;
      classes.push(offset === 0 ? styles.splash : styles["splash-wave"]);
    }

    return classes.join(" ");
  };

  /**
   * Returns inline CSS variables for splash wave timing and physical energy decay.
   */
  const getStripeStyle = (index: number): React.CSSProperties | undefined => {
    // Priority 1: Splash animation timing and decay
    if (splashIndices.has(index)) {
      const { offset, radius, intensity: peakIntensity } = splashIndices.get(index)!;

      // Organic wave attenuation using a Cosine curve (smooth ease-in-out decay)
      // Peak intensity at center, fading down smoothly to 0% at the outer radius
      const normalized = offset / radius;
      const intensity = (Math.cos(normalized * Math.PI) + 1) / 2;

      return {
        "--wave-delay": `${offset * SPLASH_WAVE_STEP_DELAY_MS}ms`,
        "--wave-duration": `${SPLASH_WAVE_ANIMATION_DURATION_MS}ms`,
        "--wave-intensity": `${intensity * peakIntensity}%`,
      } as React.CSSProperties;
    }

    return undefined;
  };

  const isReady = count > 0 && containerWidth > 0;
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;

  return (
    <svg
      ref={svgRef}
      className={`${styles.stripesSvg} ${splashIndices.size > 0 ? styles.isSplashing : ""}`}
      viewBox={isReady ? `0 0 ${containerWidth} ${containerHeight}` : undefined}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ "--hovered-index": "-999" } as React.CSSProperties}
    >
      {isReady && (
        <g transform={`rotate(15, ${centerX}, ${centerY})`}>
          {positions.map((pos, index) => (
            <rect
              key={index}
              x={pos}
              y={-overflow}
              width={10}
              height={stripeLength}
              fill="var(--color-background)"
              className={getStripeClassName(index)}
              style={
                {
                  "--index": index,
                  ...getStripeStyle(index),
                } as React.CSSProperties
              }
              onPointerDown={() => triggerSplash(index)}
              onPointerEnter={() => {
                if (svgRef.current) {
                  svgRef.current.style.setProperty("--hovered-index", String(index));
                }
              }}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
