"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useStripeGeometry } from "./use-stripe-geometry";
import { playRippleSound } from "./stripe-sound";
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
  // pointer-events is inherited, so disabling on the parent also hides children
  // from elementsFromPoint without needing to touch every descendant.
  const el = occludingElement instanceof HTMLElement || occludingElement instanceof SVGElement
    ? occludingElement : null;
  const prev = el?.style.pointerEvents;
  if (el) el.style.pointerEvents = "none";

  try {
    const hits = typeof document.elementsFromPoint === "function"
      ? document.elementsFromPoint(clientX, clientY)
      : [];
    return getStripeIndexFromPointElements(hits, svg);
  } finally {
    if (el) el.style.pointerEvents = prev ?? "";
  }
}

/**
 * SVG overlay that renders interactive diagonal stripes over the hero area.
 * The SVG itself is the positioned container (no wrapper div).
 *
 * Hover and splash visuals are both driven by SVG-level CSS variables so the
 * browser can animate the stripe field without React keeping per-stripe state.
 */
export function InteractiveStripes({ containerRef }: InteractiveStripesProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const geometry = useStripeGeometry(svgRef);
  const splashTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const proxyHoveringRef = useRef(false);
  const draggingRef = useRef(false);
  const lastDragIndexRef = useRef<number | null>(null);
  const resetIdleTimerRef = useRef<() => void>(() => { });

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
   * Starts a splash wave by updating the same SVG-level CSS variables that the
   * stripe styles read from. Restarting the `data-splashing` attribute forces
   * the CSS animation to replay without remounting the rect elements.
   */
  function triggerSplash(
    centerIndex: number,
    radius = SPLASH_WAVE_RADIUS,
    peakIntensity = SPLASH_WAVE_PEAK_INTENSITY_PERCENT,
  ): void {
    const svg = svgRef.current;
    if (!svg) return;
    const previousCenterStripe = svg.querySelector("[data-splash-center]");
    const centerStripe = svg.querySelector<SVGRectElement>(`rect[${STRIPE_INDEX_ATTRIBUTE}="${centerIndex}"]`);

    // Clear any existing active timer to prevent premature wave cutoffs
    if (splashTimerRef.current) clearTimeout(splashTimerRef.current);

    svg.removeAttribute("data-splashing");
    previousCenterStripe?.removeAttribute("data-splash-center");
    svg.style.setProperty("--splash-center-index", String(HOVER_CLEAR_INDEX));
    void svg.getBoundingClientRect();

    centerStripe?.setAttribute("data-splash-center", "");
    svg.style.setProperty("--splash-center-index", String(centerIndex));
    svg.style.setProperty("--splash-radius", String(radius));
    svg.style.setProperty("--splash-peak-intensity", `${peakIntensity}%`);
    svg.setAttribute("data-splashing", "");

    splashTimerRef.current = setTimeout(() => {
      svg.removeAttribute("data-splashing");
      centerStripe?.removeAttribute("data-splash-center");
      svg.style.setProperty("--splash-center-index", String(HOVER_CLEAR_INDEX));
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
      if (splashTimerRef.current) clearTimeout(splashTimerRef.current);
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

    const resolveProxyStripeIndex = (
      target: Element,
      clientX: number,
      clientY: number,
    ): number | null => {
      const proxyTextTarget = target.closest(PROXY_TEXT_SELECTOR);
      if (!proxyTextTarget) return null;

      return getStripeIndexFromViewportPoint(
        clientX,
        clientY,
        svgRef.current,
        proxyTextTarget,
      );
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;

      if (event.target.closest(PROXY_TEXT_SELECTOR)) {
        proxyHoveringRef.current = true;
        const hoveredIndex = resolveProxyStripeIndex(event.target, event.clientX, event.clientY);
        syncHoveredStripe(svgRef.current, hoveredIndex);
        if (draggingRef.current && hoveredIndex !== null && lastDragIndexRef.current !== hoveredIndex) {
          lastDragIndexRef.current = hoveredIndex;
          playRippleSound(hoveredIndex, count);
        }
        return;
      }

      if (isStripeRectTarget(event.target)) {
        proxyHoveringRef.current = false;
        return;
      }

      clearHoveredStripe(true);
    };

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(PROXY_TEXT_SELECTOR)) return;

      const stripeIndex = resolveProxyStripeIndex(event.target, event.clientX, event.clientY);
      if (stripeIndex === null) return;

      triggerSplash(stripeIndex);
      playRippleSound(stripeIndex, count);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(PROXY_TEXT_SELECTOR)) return;

      const stripeIndex = resolveProxyStripeIndex(event.target, event.clientX, event.clientY);
      draggingRef.current = true;
      lastDragIndexRef.current = stripeIndex;
    };

    const handlePointerUp = () => {
      draggingRef.current = false;
      lastDragIndexRef.current = null;
    };

    const handlePointerLeave = () => clearHoveredStripe(true);

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("click", handleClick);
    document.addEventListener("pointerup", handlePointerUp);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("click", handleClick);
      document.removeEventListener("pointerup", handlePointerUp);
      clearHoveredStripe();
    };
  }, [containerRef]);

  const isReady = count > 0 && containerWidth > 0;

  return (
    <svg
      ref={svgRef}
      className={styles.stripesSvg}
      viewBox={isReady ? `0 0 ${containerWidth} ${containerHeight}` : undefined}
      preserveAspectRatio="none"
      aria-hidden="true"
      onPointerUp={() => {
        draggingRef.current = false;
        lastDragIndexRef.current = null;
      }}
      onPointerLeave={() => {
        draggingRef.current = false;
        lastDragIndexRef.current = null;
        clearHoveredStripe(true);
      }}
      style={
        {
          "--hovered-index": String(HOVER_CLEAR_INDEX),
          "--splash-center-index": String(HOVER_CLEAR_INDEX),
          "--splash-radius": String(SPLASH_WAVE_RADIUS),
          "--splash-peak-intensity": `${SPLASH_WAVE_PEAK_INTENSITY_PERCENT}%`,
        } as React.CSSProperties
      }
    >
      {isReady && (
        <g transform={`rotate(15, ${centerX}, ${centerY})`}>
          {positions.map((pos, index) => {
            return (
              <rect
                key={index}
                data-stripe-index={index}
                x={pos}
                y={-overflow}
                width={10}
                height={stripeLength}
                fill="var(--color-background)"
                className={styles.stripe}
                style={
                  {
                    "--index": index,
                    "--wave-duration": `${SPLASH_WAVE_ANIMATION_DURATION_MS}ms`,
                    "--wave-step-delay": `${SPLASH_WAVE_STEP_DELAY_MS}ms`,
                  } as React.CSSProperties
                }
                // Prefer native rect hit-testing for real stripes.
                // The browser already knows which rendered rect is under the
                // pointer, so we only use JS hit-test bridging for the separate
                // case where selectable text sits above the SVG and occludes it.
                onPointerDown={() => {
                  proxyHoveringRef.current = false;
                  draggingRef.current = true;
                  lastDragIndexRef.current = index;
                  triggerSplash(index);
                  playRippleSound(index, count);
                }}
                onPointerEnter={() => {
                  proxyHoveringRef.current = false;
                  syncHoveredStripe(svgRef.current, index);
                  if (draggingRef.current && lastDragIndexRef.current !== index) {
                    lastDragIndexRef.current = index;
                    playRippleSound(index, count);
                  }
                }}
              />
            );
          })}
        </g>
      )}
    </svg>
  );
}
