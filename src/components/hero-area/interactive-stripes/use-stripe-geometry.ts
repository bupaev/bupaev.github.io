import { useEffect, useState, type RefObject } from "react";

/** Stripe layout constants matching the CSS repeating-linear-gradient */
const STRIPE_WIDTH = 10;
const SEPARATOR_WIDTH = 3;
const STRIPE_PERIOD = STRIPE_WIDTH + SEPARATOR_WIDTH; // 13px
/** The gradient angle in degrees (105deg = 15deg from vertical) */
const ANGLE_DEG = 105;
const ANGLE_RAD = (ANGLE_DEG * Math.PI) / 180;

type StripeGeometry = {
  /** Number of stripes that fit the container */
  count: number;
  /** X-offset positions for each stripe along the perpendicular axis */
  positions: number[];
  /** Container width in pixels */
  containerWidth: number;
  /** Container height in pixels */
  containerHeight: number;
  /** Total length of each stripe (diagonal height accounting for rotation) */
  stripeLength: number;
  /** Overflow amount — how much extra length is needed above/below container */
  overflow: number;
};

/**
 * Calculates the geometry of diagonal stripes for the interactive area.
 * Uses ResizeObserver to recalculate on container size changes.
 *
 * @param containerRef - ref to the area that stripes should fill
 */
export function useStripeGeometry(
  containerRef: RefObject<Element | null>,
): StripeGeometry {
  const [geometry, setGeometry] = useState<StripeGeometry>({
    count: 0,
    positions: [],
    containerWidth: 0,
    containerHeight: 0,
    stripeLength: 0,
    overflow: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const recalculate = () => {
      const containerRect = container.getBoundingClientRect();
      const { width, height } = containerRect;

      if (width === 0 || height === 0) return;

      // The stripes are rotated by 15° from vertical (105° from horizontal).
      // To cover the entire visible area, we need stripes spanning the diagonal.
      // Project the container dimensions onto the axis perpendicular to the stripes.
      const cosAngle = Math.abs(Math.cos(ANGLE_RAD));
      const sinAngle = Math.abs(Math.sin(ANGLE_RAD));

      // The perpendicular span = how much "width" the stripes need to cover
      const perpendicularSpan = width * sinAngle + height * cosAngle;

      // How many full stripe periods fit in that span (with some padding)
      const stripeCount = Math.ceil(perpendicularSpan / STRIPE_PERIOD) + 2;

      // Starting offset to center the stripe pattern
      const startOffset = -(stripeCount * STRIPE_PERIOD - perpendicularSpan) / 2;

      const positions: number[] = [];
      for (let i = 0; i < stripeCount; i++) {
        positions.push(startOffset + i * STRIPE_PERIOD);
      }

      // Stripe length needs to exceed the container diagonal so rotated rects fully cover
      const stripeLength = Math.sqrt(width * width + height * height) + 100;
      const overflow = (stripeLength - height) / 2;

      setGeometry({
        count: stripeCount,
        positions,
        containerWidth: width,
        containerHeight: height,
        stripeLength,
        overflow,
      });
    };

    // Initial calculation
    recalculate();

    const observer = new ResizeObserver(() => {
      recalculate();
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  return geometry;
}
