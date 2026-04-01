"use client";

import { useEffect, useState, useRef, type RefObject } from "react";
import { useStripeGeometry } from "./use-stripe-geometry";
import styles from "./interactive-stripes.module.scss";

/** Duration of the idle flash visibility in ms */
const FLASH_DURATION_MS = 200;
/** Interval between random idle flashes in ms */
const IDLE_INTERVAL_MS = 1000;
/** Number of neighboring stripes to animate during splash */
const SPLASH_WAVE_RADIUS = 30;
/** Delay between each wave step during splash in ms */
const SPLASH_WAVE_STEP_DELAY_MS = 48;

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
  const [flashIndex, setFlashIndex] = useState<number | null>(null);
  const [splashIndices, setSplashIndices] = useState<Map<number, number>>(new Map());

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

  // Idle flash: pick a random stripe every second
  useEffect(() => {
    if (count === 0) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * count);
      setFlashIndex(randomIndex);

      const timeout = setTimeout(() => {
        setFlashIndex((current) => (current === randomIndex ? null : current));
      }, FLASH_DURATION_MS);

      return () => clearTimeout(timeout);
    }, IDLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [count]);

  // Removed legacy window tracker in favor of synthetic React events below.

  /**
   * Triggers a splash effect: the center stripe flashes,
   * then neighboring stripes light up with decreasing intensity and increasing delay.
   */
  const triggerSplash = (centerIndex: number) => {
    const newSplash = new Map<number, number>();
    for (let offset = -SPLASH_WAVE_RADIUS; offset <= SPLASH_WAVE_RADIUS; offset++) {
      const idx = centerIndex + offset;
      if (idx >= 0 && idx < count) {
        newSplash.set(idx, Math.abs(offset));
      }
    }
    setSplashIndices(newSplash);
    setTimeout(() => {
      setSplashIndices(new Map());
    }, 600 + SPLASH_WAVE_RADIUS * SPLASH_WAVE_STEP_DELAY_MS);
  };

  /**
   * Returns the CSS class name(s) for a stripe based on its current state.
   */
  const getStripeClassName = (index: number): string => {
    const classes = [styles.stripe];
    if (splashIndices.has(index)) {
      const offset = splashIndices.get(index)!;
      classes.push(offset === 0 ? styles.splash : styles["splash-wave"]);
    } else if (flashIndex === index) {
      classes.push(styles.flash);
    }
    return classes.join(" ");
  };

  /**
   * Returns inline CSS variables for splash wave timing and physical energy decay.
   */
  const getStripeStyle = (index: number): React.CSSProperties | undefined => {
    if (splashIndices.has(index)) {
      const offset = splashIndices.get(index)!;

      // Organic wave attenuation using a Cosine curve (smooth ease-in-out decay)
      // 100% intensity at center, fading down smoothly to 0% at the outer radius
      const normalized = offset / SPLASH_WAVE_RADIUS;
      const intensity = (Math.cos(normalized * Math.PI) + 1) / 2;

      return {
        "--wave-delay": `${offset * SPLASH_WAVE_STEP_DELAY_MS}ms`,
        "--wave-duration": "600ms",
        "--wave-intensity": `${intensity * 100}%`,
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
      className={styles.stripesSvg}
      viewBox={isReady ? `0 0 ${containerWidth} ${containerHeight}` : undefined}
      preserveAspectRatio="none"
      aria-hidden="true"
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
              style={getStripeStyle(index)}
              onPointerDown={() => triggerSplash(index)}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
