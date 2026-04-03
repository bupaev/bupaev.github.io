"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useStripeGeometry } from "./use-stripe-geometry";
import styles from "./interactive-stripes.module.scss";

/** Delay between each wave step during splash in ms */
const SPLASH_WAVE_STEP_DELAY_MS = 64;
/** Total duration of the physical drop bounce animation */
const SPLASH_WAVE_ANIMATION_DURATION_MS = 1500;

/** Interval between random idle wave splashes in ms */
const IDLE_INTERVAL_MS = 5000;
/** Number of neighboring stripes to animate during idle splash */
const IDLE_WAVE_RADIUS = 30;
/** Max fill intensity percentage for idle splash peaks */
const IDLE_WAVE_PEAK_INTENSITY_PERCENT = 25;

/** Number of neighboring stripes to animate during manual click splash */
const SPLASH_WAVE_RADIUS = 50;
/** Max fill intensity percentage for moving splash wave peaks */
const SPLASH_WAVE_PEAK_INTENSITY_PERCENT = 35;

const HOVER_CLEAR_INDEX = -999;
const PROXY_TEXT_SELECTOR = "[data-stripe-proxy-text]";
const STRIPE_INDEX_ATTRIBUTE = "data-stripe-index";

type SplashOffset = {
  offset: number;
  radius: number;
  intensity: number;
  splashId: number;
};

type InteractiveStripesProps = {
  containerRef: RefObject<HTMLElement | null>;
};

/**
 * Keeps the CSS-driven hover state in one place so native rect hover and
 * proxy-text hover both drive the same visual mechanism.
 *
 * Returns whether the SVG was considered hovered before the update, which lets
 * callers decide whether resetting the idle timer is necessary.
 */
function syncHoveredStripe(svg: SVGSVGElement | null, index: number | null): boolean {
  if (!svg) return false;

  const wasHovering = svg.hasAttribute("data-hovering");
  svg.style.setProperty("--hovered-index", String(index ?? HOVER_CLEAR_INDEX));

  if (index === null) {
    svg.removeAttribute("data-hovering");
  } else {
    svg.setAttribute("data-hovering", "");
  }

  return wasHovering;
}

/**
 * Extracts a stripe index from a hit-test result list by finding the first rect
 * that belongs to this SVG instance. This avoids coupling the proxy path to the
 * stripe geometry math and keeps it aligned with the actual rendered DOM.
 */
function getStripeIndexFromPointElements(
  elements: Element[],
  svg: SVGSVGElement | null,
): number | null {
  if (!svg) return null;

  const stripeElement = elements.find((element) =>
    element instanceof SVGElement
    && element.ownerSVGElement === svg
    && element.tagName.toLowerCase() === "rect"
    && element.hasAttribute(STRIPE_INDEX_ATTRIBUTE));

  if (!stripeElement) return null;

  const rawIndex = stripeElement.getAttribute(STRIPE_INDEX_ATTRIBUTE);
  if (rawIndex === null) return null;

  const stripeIndex = Number(rawIndex);
  return Number.isInteger(stripeIndex) ? stripeIndex : null;
}

/**
 * Resolves the stripe under a viewport coordinate.
 *
 * When the pointer is over selectable heading text, that text would normally
 * occlude the SVG in `elementsFromPoint()`. Temporarily disabling pointer
 * events on the occluding element lets the browser perform the real hit test
 * against the stripe layer underneath, then the original state is restored
 * immediately.
 */
function getStripeIndexFromViewportPoint(
  clientX: number,
  clientY: number,
  svg: SVGSVGElement | null,
  occludingElement?: Element | null,
): number | null {
  let previousPointerEventsValue: string | null = null;

  if (occludingElement instanceof HTMLElement || occludingElement instanceof SVGElement) {
    previousPointerEventsValue = occludingElement.style.pointerEvents;
    occludingElement.style.pointerEvents = "none";
  }

  const pointElements = typeof document.elementsFromPoint === "function"
    ? document.elementsFromPoint(clientX, clientY)
    : [];

  if (occludingElement instanceof HTMLElement || occludingElement instanceof SVGElement) {
    occludingElement.style.pointerEvents = previousPointerEventsValue ?? "";
  }

  return getStripeIndexFromPointElements(pointElements, svg);
}

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
  const idleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const proxyHoveringRef = useRef(false);
  const resetIdleTimerRef = useRef<() => void>(() => {});

  const { count, positions, containerWidth, containerHeight, stripeLength, overflow } = geometry;
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;

  /**
   * Clears the synthetic hover state used for proxy-text interaction.
   *
   * Native rect hover restores itself through rect-level pointer events, but
   * proxy hover needs explicit teardown so the idle animation can resume once
   * the pointer leaves the text path.
   */
  const clearHoveredStripe = (resetIdle = false) => {
    proxyHoveringRef.current = false;
    const wasHovering = syncHoveredStripe(svgRef.current, null);
    if (resetIdle && wasHovering) {
      resetIdleTimerRef.current();
    }
  };

  const isStripeRectTarget = (target: EventTarget | null) =>
    target instanceof SVGElement
    && target.ownerSVGElement === svgRef.current
    && target.tagName.toLowerCase() === "rect";

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

  /**
   * Materializes the splash wave into per-stripe animation state.
   *
   * The state stores distance from the impact point rather than precomputed CSS
   * values so rendering can derive timing and intensity consistently for both
   * manual and idle splashes.
   */
  function triggerSplash(
    centerIndex: number,
    radius = SPLASH_WAVE_RADIUS,
    peakIntensity = SPLASH_WAVE_PEAK_INTENSITY_PERCENT,
  ): void {
    const splashId = Date.now() + Math.random();
    const newSplash = new Map<number, SplashOffset>();

    for (let offset = -radius; offset <= radius; offset++) {
      const idx = centerIndex + offset;
      if (idx >= 0 && idx < count) {
        newSplash.set(idx, { offset: Math.abs(offset), radius, intensity: peakIntensity, splashId });
      }
    }

    setSplashIndices(newSplash);

    // Clear any existing active timer to prevent premature wave cutoffs
    if (splashTimerRef.current) clearTimeout(splashTimerRef.current);

    splashTimerRef.current = setTimeout(() => {
      setSplashIndices(new Map());
      splashTimerRef.current = null;
    }, SPLASH_WAVE_ANIMATION_DURATION_MS + radius * SPLASH_WAVE_STEP_DELAY_MS);
  }

  /**
   * Restarts the idle wave scheduler.
   *
   * The interval is paused implicitly while any hover state is active so the
   * ambient animation does not compete visually with user-driven interaction.
   */
  function resetIdleTimer() {
    if (idleIntervalRef.current) clearInterval(idleIntervalRef.current);
    idleIntervalRef.current = null;
    if (count === 0) return;

    idleIntervalRef.current = setInterval(() => {
      if (svgRef.current?.hasAttribute("data-hovering") || count === 0) return;

      // Pick a random index in the middle 70% (skipping 15% from each edge)
      const g = (Math.random() + Math.random() + Math.random()) / 3;
      const randomIndex = Math.floor(count * (0.15 + g * 0.7));

      triggerSplash(randomIndex, IDLE_WAVE_RADIUS, IDLE_WAVE_PEAK_INTENSITY_PERCENT);
    }, IDLE_INTERVAL_MS);
  }

  resetIdleTimerRef.current = resetIdleTimer;

  // Idle splash: pick a random stripe every few seconds, reset on mouse leave
  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleIntervalRef.current) clearInterval(idleIntervalRef.current);
    };
  }, [count]);

  /**
   * Bridges pointer interaction from selectable text back to the stripe layer.
   *
   * Normal stripe interaction stays native on the rect elements. This effect
   * only handles the special case where the text layer sits above the SVG and
   * would otherwise absorb pointer events needed for hover and splash lookup.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const proxyTextTarget = target.closest(PROXY_TEXT_SELECTOR);
      if (proxyTextTarget) {
        proxyHoveringRef.current = true;
        const hoveredIndex = getStripeIndexFromViewportPoint(
          event.clientX,
          event.clientY,
          svgRef.current,
          proxyTextTarget,
        );

        syncHoveredStripe(svgRef.current, hoveredIndex);
        return;
      }

      if (isStripeRectTarget(target)) {
        proxyHoveringRef.current = false;
        return;
      }

      clearHoveredStripe(true);
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const proxyTextTarget = target.closest(PROXY_TEXT_SELECTOR);
      if (!proxyTextTarget) return;

      const stripeIndex = getStripeIndexFromViewportPoint(
        event.clientX,
        event.clientY,
        svgRef.current,
        proxyTextTarget,
      );
      if (stripeIndex === null) return;

      proxyHoveringRef.current = true;
      syncHoveredStripe(svgRef.current, stripeIndex);
      triggerSplash(stripeIndex);
    };

    const handlePointerLeave = () => clearHoveredStripe(true);

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointerleave", handlePointerLeave);
      clearHoveredStripe();
    };
  }, [containerRef]);

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

      // Cosine attenuation keeps the wave strongest at the center while fading
      // smoothly to zero at the edge of the splash radius.
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

  return (
    <svg
      ref={svgRef}
      className={`${styles.stripesSvg} ${splashIndices.size > 0 ? styles.isSplashing : ""}`}
      viewBox={isReady ? `0 0 ${containerWidth} ${containerHeight}` : undefined}
      preserveAspectRatio="none"
      aria-hidden="true"
      onPointerLeave={() => clearHoveredStripe(true)}
      style={{ "--hovered-index": String(HOVER_CLEAR_INDEX) } as React.CSSProperties}
    >
      {isReady && (
        <g transform={`rotate(15, ${centerX}, ${centerY})`}>
          {positions.map((pos, index) => {
            const splashOffset = splashIndices.get(index);

            return (
              <rect
                key={`${index}-${splashOffset?.splashId || 0}`}
                data-stripe-index={index}
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
                // Prefer native rect hit-testing for real stripes.
                // The browser already knows which rendered rect is under the
                // pointer, so we only use JS hit-test bridging for the separate
                // case where selectable text sits above the SVG and occludes it.
                onPointerDown={() => {
                  proxyHoveringRef.current = false;
                  triggerSplash(index);
                }}
                onPointerEnter={() => {
                  proxyHoveringRef.current = false;
                  syncHoveredStripe(svgRef.current, index);
                }}
              />
            );
          })}
        </g>
      )}
    </svg>
  );
}
