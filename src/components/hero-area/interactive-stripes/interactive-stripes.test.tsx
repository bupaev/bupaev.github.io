import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import React from "react";
import { InteractiveStripes } from "./interactive-stripes";

// Provide a stable mocked geometry layout for deterministic tests.
// The physics math requires count/bounds to operate correctly.
vi.mock("./use-stripe-geometry", () => ({
  useStripeGeometry: () => ({
    count: 100,
    positions: Array.from({ length: 100 }, (_, i) => i * 13),
    containerWidth: 1000,
    containerHeight: 1000,
    stripeLength: 1500,
    overflow: 200,
  }),
}));

const IDLE_INTERVAL_MS = 5000;
const SPLASH_WAVE_ANIMATION_DURATION_MS = 1500;
const SPLASH_WAVE_STEP_DELAY_MS = 64;
const MANUAL_RADIUS = 50;

const elementsFromPointMock = vi.fn<(x: number, y: number) => Element[]>();

function getClassNames(element: Element | null): string {
  return element?.getAttribute("class") ?? "";
}

describe("InteractiveStripes (Drop Ripple Physics)", () => {
  let mockRef: React.RefObject<HTMLDivElement | null>;
  let originalElementsFromPoint: typeof document.elementsFromPoint;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    originalElementsFromPoint = document.elementsFromPoint;
    elementsFromPointMock.mockReset();
    elementsFromPointMock.mockReturnValue([]);
    Object.defineProperty(document, "elementsFromPoint", {
      configurable: true,
      value: elementsFromPointMock,
    });

    const containerElement = document.createElement("div");
    mockRef = { current: containerElement };
    document.body.appendChild(containerElement);
  });

  afterEach(() => {
    Object.defineProperty(document, "elementsFromPoint", {
      configurable: true,
      value: originalElementsFromPoint,
    });
    mockRef.current?.remove();

    vi.restoreAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  const renderStripes = () => {
    const result = render(<InteractiveStripes containerRef={mockRef} />);
    const svg = result.container.querySelector("svg");
    const stripes = Array.from(result.container.querySelectorAll("rect"));

    expect(svg).toBeInTheDocument();

    return {
      container: result.container,
      svg: svg as SVGSVGElement,
      stripes: stripes as SVGRectElement[],
    };
  };

  const createProxyText = (tagName: "h1" | "h2" = "h1") => {
    const proxyText = document.createElement(tagName);
    proxyText.setAttribute("data-stripe-proxy-text", "");
    mockRef.current?.appendChild(proxyText);
    return proxyText;
  };

  const mockPassThroughHitTest = (proxyText: HTMLElement, stripe: SVGRectElement) => {
    elementsFromPointMock.mockImplementation(() =>
      proxyText.style.pointerEvents === "none" ? [stripe] : [proxyText]);
  };

  it("renders the SVG container and stripe rect elements", () => {
    const { svg, stripes } = renderStripes();

    expect(getClassNames(svg)).not.toMatch(/isSplashing/);
    expect(stripes).toHaveLength(100);
  });

  it("updates SVG hovered index on native stripe hover", () => {
    const { svg, stripes } = renderStripes();

    fireEvent.pointerEnter(stripes[15]);

    expect(svg.style.getPropertyValue("--hovered-index")).toBe("15");
    expect(svg.hasAttribute("data-hovering")).toBe(true);
  });

  it("maps proxy text pointer movement to the underlying stripe", () => {
    const { svg, stripes } = renderStripes();
    const proxyText = createProxyText("h1");

    mockPassThroughHitTest(proxyText, stripes[22]);

    fireEvent.pointerMove(proxyText, { clientX: 120, clientY: 180 });

    expect(svg.style.getPropertyValue("--hovered-index")).toBe("22");
    expect(svg.hasAttribute("data-hovering")).toBe(true);
    expect(proxyText.style.pointerEvents).toBe("");
  });

  it("clears proxy hover when pointer moves from text into a non-proxy area", () => {
    const { svg, stripes } = renderStripes();
    const proxyText = createProxyText("h1");
    const neutralArea = document.createElement("div");

    mockRef.current?.appendChild(neutralArea);

    mockPassThroughHitTest(proxyText, stripes[22]);
    fireEvent.pointerMove(proxyText, { clientX: 120, clientY: 180 });

    expect(svg.style.getPropertyValue("--hovered-index")).toBe("22");
    expect(svg.hasAttribute("data-hovering")).toBe(true);

    elementsFromPointMock.mockReturnValue([]);
    fireEvent.pointerMove(neutralArea, { clientX: 320, clientY: 180 });

    expect(svg.style.getPropertyValue("--hovered-index")).toBe("-999");
    expect(svg.hasAttribute("data-hovering")).toBe(false);
  });

  it("triggers a splash when pointerdown starts on proxy text", () => {
    const { container, svg, stripes } = renderStripes();
    const proxyText = createProxyText("h2");

    mockPassThroughHitTest(proxyText, stripes[22]);
    fireEvent.pointerDown(proxyText, { clientX: 200, clientY: 260 });

    const updatedStripes = Array.from(container.querySelectorAll("rect")) as SVGRectElement[];

    expect(getClassNames(svg)).toMatch(/isSplashing/);
    expect(getClassNames(updatedStripes[22])).toMatch(/splash/);
    expect(proxyText.style.pointerEvents).toBe("");
  });

  it("suppresses idle splash during proxy hover and clears hover on leave", () => {
    const { svg, stripes } = renderStripes();
    const proxyText = createProxyText("h1");

    mockPassThroughHitTest(proxyText, stripes[35]);
    fireEvent.pointerMove(proxyText, { clientX: 50, clientY: 80 });

    act(() => {
      vi.advanceTimersByTime(IDLE_INTERVAL_MS);
    });

    expect(getClassNames(svg)).not.toMatch(/isSplashing/);
    expect(svg.style.getPropertyValue("--hovered-index")).toBe("35");

    fireEvent.pointerLeave(mockRef.current!);

    expect(svg.style.getPropertyValue("--hovered-index")).toBe("-999");
    expect(svg.hasAttribute("data-hovering")).toBe(false);
  });

  it("triggers the idle physical splash automatically after IDLE_INTERVAL_MS", () => {
    const { container, svg } = renderStripes();

    act(() => {
      vi.advanceTimersByTime(IDLE_INTERVAL_MS);
    });

    const stripes = Array.from(container.querySelectorAll("rect")) as SVGRectElement[];
    const splashCenterIndex = stripes.findIndex((stripe) => {
      const classNames = getClassNames(stripe);
      return /splash/.test(classNames) && !/splash-wave/.test(classNames);
    });

    expect(getClassNames(svg)).toMatch(/isSplashing/);
    expect(splashCenterIndex).toBeGreaterThanOrEqual(0);
    expect(getClassNames(stripes[splashCenterIndex])).toMatch(/splash/);
    expect(getClassNames(stripes[splashCenterIndex + 15])).toMatch(/splash-wave/);
    expect(getClassNames(stripes[splashCenterIndex + 35])).not.toMatch(/splash-wave/);
  });

  it("allows a manual click to interrupt an idle wave safely and take over priority", () => {
    const { container } = renderStripes();

    act(() => {
      vi.advanceTimersByTime(IDLE_INTERVAL_MS);
    });

    const stripes = Array.from(container.querySelectorAll("rect")) as SVGRectElement[];

    act(() => {
      fireEvent.pointerDown(stripes[10]);
    });

    const newStripes = Array.from(container.querySelectorAll("rect")) as SVGRectElement[];

    expect(getClassNames(newStripes[10])).toMatch(/splash/);
    expect(getClassNames(newStripes[50])).not.toMatch(/splash$/);
    expect(getClassNames(newStripes[50])).toMatch(/splash-wave/);
  });

  it("removes the splashing class exactly after animation concludes", () => {
    const { svg, stripes } = renderStripes();

    act(() => {
      fireEvent.pointerDown(stripes[50]);
    });

    expect(getClassNames(svg)).toMatch(/isSplashing/);

    const totalDuration = SPLASH_WAVE_ANIMATION_DURATION_MS + (MANUAL_RADIUS * SPLASH_WAVE_STEP_DELAY_MS);

    act(() => {
      vi.advanceTimersByTime(totalDuration - 1);
    });

    expect(getClassNames(svg)).toMatch(/isSplashing/);

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(getClassNames(svg)).not.toMatch(/isSplashing/);
  });
});
