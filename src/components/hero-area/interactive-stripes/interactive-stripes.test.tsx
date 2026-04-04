import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, act, type RenderResult } from "@testing-library/react";
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

const IDLE_FIRST_DELAY_MS = 1000;
const IDLE_INTERVAL_MS = 10000;
const SPLASH_WAVE_ANIMATION_DURATION_MS = 1500;
const SPLASH_WAVE_STEP_DELAY_MS = 64;
const MANUAL_RADIUS = 50;

const elementsFromPointMock = vi.fn<(x: number, y: number) => Element[]>();

let lastObserverCallback: IntersectionObserverCallback | null = null;

// IntersectionObserver is not available in JSDOM environment used by Vitest.
class IntersectionObserverMock {
  constructor(public callback: IntersectionObserverCallback) {
    lastObserverCallback = callback;
  }
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

// requestAnimationFrame is needed for the optimized scroll listener
vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => cb(Date.now()));

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
    let result: RenderResult = {} as RenderResult;
    act(() => {
      result = render(<InteractiveStripes containerRef={mockRef} />);
    });

    // Manually trigger visible state
    if (lastObserverCallback) {
      act(() => {
        lastObserverCallback!(
          [{ isIntersecting: true } as IntersectionObserverEntry],
          {} as IntersectionObserver
        );
      });
    }

    const svg = result.container.querySelector("svg");
    const stripes = Array.from(result.container.querySelectorAll("rect"));

    expect(svg).toBeInTheDocument();

    return {
      container: result.container,
      svg: svg as SVGSVGElement,
      stripes: stripes as SVGRectElement[],
    };
  };

  const createProxyText = (tagName: keyof HTMLElementTagNameMap = "div") => {
    const proxyText = document.createElement(tagName);
    proxyText.setAttribute("data-stripe-proxy-text", "");
    mockRef.current?.appendChild(proxyText);
    return proxyText;
  };

  const mockPassThroughHitTest = (proxyText: HTMLElement, stripe: SVGRectElement) => {
    elementsFromPointMock.mockImplementation(() =>
      proxyText.style.pointerEvents === "none" ? [stripe] : [proxyText]);
  };

  const mockNestedPassThroughHitTest = (
    proxyText: HTMLElement,
    _occludingChild: HTMLElement,
    stripe: SVGRectElement,
  ) => {
    // pointer-events is inherited, so only the parent needs disabling
    elementsFromPointMock.mockImplementation(() =>
      proxyText.style.pointerEvents === "none"
        ? [stripe]
        : [_occludingChild]);
  };

  it("renders the SVG container and stripe rect elements", () => {
    const { svg, stripes } = renderStripes();

    expect(svg.hasAttribute("data-splashing")).toBe(false);
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

  it("triggers a splash when clicking proxy text", () => {
    const { svg, stripes } = renderStripes();
    const proxyText = createProxyText();

    mockPassThroughHitTest(proxyText, stripes[22]);
    fireEvent.click(proxyText, { clientX: 200, clientY: 260 });

    expect(svg.hasAttribute("data-splashing")).toBe(true);
    expect(svg.style.getPropertyValue("--splash-center-index")).toBe("22");
    expect(stripes[22].hasAttribute("data-splash-center")).toBe(true);
    expect(proxyText.style.pointerEvents).toBe("");
  });

  it("triggers a splash when clicking nested proxy text content", () => {
    const { svg, stripes } = renderStripes();
    const proxyText = createProxyText();
    const nestedSpan = document.createElement("span");

    proxyText.appendChild(nestedSpan);
    mockNestedPassThroughHitTest(proxyText, nestedSpan, stripes[37]);
    fireEvent.click(nestedSpan, { clientX: 210, clientY: 240 });

    expect(svg.hasAttribute("data-splashing")).toBe(true);
    expect(svg.style.getPropertyValue("--splash-center-index")).toBe("37");
    expect(proxyText.style.pointerEvents).toBe("");
    expect(nestedSpan.style.pointerEvents).toBe("");
  });

  it("suppresses idle splash during proxy hover and clears hover on leave", () => {
    const { svg, stripes } = renderStripes();
    const proxyText = createProxyText("h1");

    mockPassThroughHitTest(proxyText, stripes[35]);
    fireEvent.pointerMove(proxyText, { clientX: 50, clientY: 80 });

    act(() => {
      vi.advanceTimersByTime(IDLE_INTERVAL_MS);
    });

    expect(svg.hasAttribute("data-splashing")).toBe(false);
    expect(svg.style.getPropertyValue("--hovered-index")).toBe("35");

    fireEvent.pointerLeave(mockRef.current!);

    expect(svg.style.getPropertyValue("--hovered-index")).toBe("-999");
    expect(svg.hasAttribute("data-hovering")).toBe(false);
  });

  it("triggers the first idle splash after IDLE_FIRST_DELAY_MS at 40% position", () => {
    const { svg } = renderStripes();

    act(() => {
      vi.advanceTimersByTime(IDLE_FIRST_DELAY_MS);
    });

    expect(svg.hasAttribute("data-splashing")).toBe(true);
    expect(svg.style.getPropertyValue("--splash-center-index")).toBe("40");
  });

  it("allows a manual click to interrupt an idle wave safely and take over priority", () => {
    const { svg, stripes } = renderStripes();

    act(() => {
      vi.advanceTimersByTime(IDLE_FIRST_DELAY_MS);
    });

    act(() => {
      fireEvent.pointerDown(stripes[10]);
    });

    expect(svg.hasAttribute("data-splashing")).toBe(true);
    expect(svg.style.getPropertyValue("--splash-center-index")).toBe("10");
  });

  it("removes the splashing class exactly after animation concludes", () => {
    const { svg, stripes } = renderStripes();

    // Drain the first idle splash so it doesn't interfere with timing below
    act(() => {
      vi.advanceTimersByTime(IDLE_FIRST_DELAY_MS);
    });

    act(() => {
      fireEvent.pointerDown(stripes[50]);
    });

    expect(svg.hasAttribute("data-splashing")).toBe(true);

    const totalDuration = SPLASH_WAVE_ANIMATION_DURATION_MS + (MANUAL_RADIUS * SPLASH_WAVE_STEP_DELAY_MS);

    act(() => {
      vi.advanceTimersByTime(totalDuration - 1);
    });

    expect(svg.hasAttribute("data-splashing")).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(svg.hasAttribute("data-splashing")).toBe(false);
    expect(stripes[50].hasAttribute("data-splash-center")).toBe(false);
  });
});
