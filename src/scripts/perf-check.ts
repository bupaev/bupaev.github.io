/**
 * Performance & Compatibility Guard
 *
 * Two independent checks run on page load:
 *
 * 1. Compatibility check (synchronous, instant)
 *    Detects Safari (complex SVG filters are poorly optimized in WebKit)
 *    and browsers without scroll-driven animation support (e.g. Firefox).
 *    Sets `data-low-perf="compat"` immediately so CSS can adapt.
 *
 * 2. FPS microbenchmark (async, ~1 s after load)
 *    Measures real rendering FPS. If the device struggles to hit the
 *    threshold, sets `data-low-perf="fps"` so expensive effects are
 *    disabled for the session.
 *
 * Both checks are no-ops after they fire — zero ongoing overhead.
 */

// ─── Config ──────────────────────────────────────────────────────────────────

const FPS_THRESHOLD = 50; // fps — below this we consider the device low-power
const MEASUREMENT_DURATION_MS = 1000; // measure for ~1 s after load

// ─── 1. Compatibility check ───────────────────────────────────────────────────

function checkCompatibility(): void {
  const isSafari =
    typeof navigator !== "undefined" &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const supportsScrollAnimations =
    typeof CSS !== "undefined" && CSS.supports("animation-timeline", "scroll()");

  if (isSafari || !supportsScrollAnimations) {
    document.documentElement.setAttribute("data-low-perf", "compat");

    console.warn(
      isSafari
        ? "🦁 Compatibility Mode: Safari detected. WebKit has known issues with complex SVG filters, " +
          "so the Brain Diagram switched to text mode with animations off. Everything else is business as usual."
        : "🦁 Compatibility Mode: Your browser doesn't support scroll-driven animations yet. " +
          "Brain Diagram is in text mode with animations disabled. Everything still works, just calmer.",
    );
  }
}

// Run immediately — before any paint — so CSS picks it up on first render
checkCompatibility();

// ─── 2. FPS microbenchmark ────────────────────────────────────────────────────

function measureFPS(): void {
  // Skip if compatibility mode already set the attribute
  if (document.documentElement.hasAttribute("data-low-perf")) return;

  let frameCount = 0;
  let startTime = 0;

  const tick = (timestamp: number): void => {
    if (startTime === 0) startTime = timestamp;

    frameCount++;

    const elapsed = timestamp - startTime;
    if (elapsed < MEASUREMENT_DURATION_MS) {
      requestAnimationFrame(tick);
      return;
    }

    const fps = (frameCount * 1000) / elapsed;

    console.log(`⏱ Perf Check: ${fps.toFixed(1)} fps over ${elapsed.toFixed(0)} ms`);

    if (fps < FPS_THRESHOLD) {
      document.documentElement.setAttribute("data-low-perf", "fps");

      console.warn(
        `🐢 Low Performance Mode: Only ${fps.toFixed(0)} fps detected — your device is doing its best and we respect that. ` +
          "Hero area switched to a simple fade-in, Brain Diagram is in text mode with animations off. " +
          "Same great content, just lighter on the GPU.",
      );
    }
  };

  requestAnimationFrame(tick);
}

if (document.readyState === "complete") {
  measureFPS();
} else {
  window.addEventListener("load", measureFPS, { once: true });
}

export {};
