import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import { InteractiveStripes } from './interactive-stripes';
import React from 'react';

// Provide a stable mocked geometry layout for deterministic tests.
// The physics math requires count/bounds to operate correctly.
vi.mock('./use-stripe-geometry', () => ({
    useStripeGeometry: () => ({
        count: 100, // 100 imaginary stripes
        positions: Array.from({ length: 100 }, (_, i) => i * 13),
        containerWidth: 1000,
        containerHeight: 1000,
        stripeLength: 1500,
        overflow: 200,
    }),
}));

const IDLE_INTERVAL_MS = 4500;
const SPLASH_WAVE_ANIMATION_DURATION_MS = 1500;
const SPLASH_WAVE_STEP_DELAY_MS = 64; // Value currently configured for manual wave
const MANUAL_RADIUS = 50;

describe('InteractiveStripes (Drop Ripple Physics)', () => {
    let mockRef: React.RefObject<HTMLDivElement | null>;

    beforeEach(() => {
        vi.useFakeTimers();

        // Mock Math.random to always pick exactly the absolute middle stripe (index 50)
        // Since the component uses (a + b + c)/3 for Gaussian, we just mock random to return 0.5.
        vi.spyOn(Math, 'random').mockReturnValue(0.5);

        mockRef = { current: document.createElement('div') };
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it('renders the SVG container and stripe `<rect>` elements', () => {
        let container: HTMLElement;
        act(() => {
            const result = render(<InteractiveStripes containerRef={mockRef} />);
            container = result.container;
        });

        const svg = container!.querySelector('svg');
        expect(svg).toBeInTheDocument();

        // It should not have the `isSplashing` class initially
        expect(svg?.className.baseVal).not.toMatch(/isSplashing/);

        // Ensure 100 stripes exist from our mock geometry
        const stripes = container!.querySelectorAll('rect');
        expect(stripes.length).toBe(100);
    });

    it('updates SVG `--hovered-index` custom property on mouse pointer enter', () => {
        let container: HTMLElement;
        act(() => {
            const result = render(<InteractiveStripes containerRef={mockRef} />);
            container = result.container;
        });
        const stripes = container!.querySelectorAll('rect');

        // Trigger pointer-enter on index 15
        fireEvent.pointerEnter(stripes[15]);

        // Verify SVG style variable was updated correctly
        const svg = container.querySelector('svg');
        expect(svg?.style.getPropertyValue('--hovered-index')).toBe('15');
    });

    it('triggers the idle physical splash automatically after IDLE_INTERVAL_MS', () => {
        let container: HTMLElement;
        act(() => {
            container = render(<InteractiveStripes containerRef={mockRef} />).container;
        });

        act(() => {
            vi.advanceTimersByTime(IDLE_INTERVAL_MS);
        });

        const svg = container!.querySelector('svg');
        const stripes = container!.querySelectorAll('rect');

        // The container MUST receive the `.isSplashing` class to suspend static `--interactive-stripe-opacity`
        expect(svg?.className.baseVal).toMatch(/isSplashing/);

        // The center stripe (Math.random mock -> 50) should get `.splash` class
        expect(stripes[50].className.baseVal).toMatch(/splash/);

        // A neighboring stripe within the idle radius (10) should have .splash-wave
        // (Wait, the idle radius is 30 in the code currently). Index 65 is within radius 30.
        expect(stripes[65].className.baseVal).toMatch(/splash-wave/);

        // A stripe far outside (e.g., radius > 30) should NOT have splash class
        // 50 + 35 = 85
        expect(stripes[85].className.baseVal).not.toMatch(/splash-wave/);
    });

    it('allows a manual click to interrupt an idle wave safely and take over priority', () => {
        let container: HTMLElement;
        act(() => {
            container = render(<InteractiveStripes containerRef={mockRef} />).container;
        });

        // Trigger idle animation first
        act(() => {
            vi.advanceTimersByTime(IDLE_INTERVAL_MS);
        });

        const stripes = container!.querySelectorAll('rect');

        // While idle animation is playing, user clicks a completely different stripe (index 10)
        act(() => {
            fireEvent.pointerDown(stripes[10]);
        });

        // Elements were unmounted and remounted due to key change, re-query:
        const newStripes = container!.querySelectorAll('rect');

        // The center of the wave should INSTANTLY jump to the new manual click center (index 10)
        expect(newStripes[10].className.baseVal).toMatch(/splash/);
        expect(newStripes[50].className.baseVal).not.toMatch(/splash$/); // Idle center should lose the pure `.splash` center focus

        // It should use the MANUAL_RADIUS (50). So index 10 + 40 = 50 should have `.splash-wave` now!
        expect(newStripes[50].className.baseVal).toMatch(/splash-wave/);
    });

    it('removes `.isSplashing` class and unlocks static styles exactly after animation concludes', () => {
        let container: HTMLElement;
        act(() => {
            container = render(<InteractiveStripes containerRef={mockRef} />).container;
        });
        const stripes = container!.querySelectorAll('rect');
        const svg = container!.querySelector('svg');
        if (svg) {
            svg.matches = vi.fn().mockReturnValue(true); // Mock hover state to suppress random idle interrupts
        }

        act(() => {
            fireEvent.pointerDown(stripes[50]); // Center click
        });

        expect(svg?.className.baseVal).toMatch(/isSplashing/);

        // Advance timers by exactly the max timeout formula calculating physically-accurate propagation:
        // SPLASH_WAVE_ANIMATION_DURATION_MS + radius * SPLASH_WAVE_STEP_DELAY_MS
        const totalDuration = SPLASH_WAVE_ANIMATION_DURATION_MS + (MANUAL_RADIUS * SPLASH_WAVE_STEP_DELAY_MS);

        act(() => {
            // we advance just BEFORE it finishes
            vi.advanceTimersByTime(totalDuration - 1);
        });

        expect(svg?.className.baseVal).toMatch(/isSplashing/); // should still be locked

        act(() => {
            // finish the exact millisecond
            vi.advanceTimersByTime(1);
        });

        expect(svg?.className.baseVal).not.toMatch(/isSplashing/); // fully cleared!
    });
});
