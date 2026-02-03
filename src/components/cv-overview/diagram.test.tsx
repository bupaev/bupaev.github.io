import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { Diagram } from './diagram';

describe('Diagram', () => {
    let mockIntersectionCallback: IntersectionObserverCallback;
    const mockObserve = vi.fn();
    const mockDisconnect = vi.fn();
    let rafCallbacks: Array<FrameRequestCallback>;
    let rafIdCounter: number;

    beforeEach(() => {
        vi.useFakeTimers();
        rafCallbacks = [];
        rafIdCounter = 0;

        vi.stubGlobal('IntersectionObserver', vi.fn(function (this: unknown, callback: IntersectionObserverCallback) {
            mockIntersectionCallback = callback;
            return {
                observe: mockObserve,
                unobserve: vi.fn(),
                disconnect: mockDisconnect,
            };
        }));

        // Queue rAF callbacks instead of executing synchronously to avoid infinite recursion
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            rafCallbacks.push(cb);
            return ++rafIdCounter;
        });
        vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => { });

        // Default mock for getBoundingClientRect to simulate "in view" but not necessarily "completed animation"
        // Individual tests can override this.
        // By default, we place it well below viewport (top large positive) to simulate initial state
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            bottom: 2000,
            height: 500,
            left: 0,
            right: 800,
            top: 1500,
            width: 800,
            x: 0,
            y: 0,
            toJSON: () => { },
        });
    });

    const flushRaf = () => {
        // Execute one batch of queued rAF callbacks
        const batch = rafCallbacks.splice(0, rafCallbacks.length);
        batch.forEach((cb) => cb(performance.now()));
    };

    const simulateAnimationComplete = () => {
        // Mock client rect to be fully in view (top = 0)
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            bottom: 500,
            height: 500,
            left: 0,
            right: 800,
            top: 0,
            width: 800,
            x: 0,
            y: 0,
            toJSON: () => { },
        });

        // Trigger intersection to start observing scroll
        act(() => {
            if (mockIntersectionCallback) {
                mockIntersectionCallback(
                    [{ isIntersecting: true } as IntersectionObserverEntry],
                    {} as IntersectionObserver,
                );
            }
        });

        // Trigger scroll event to update state
        fireEvent.scroll(window);
    };

    afterEach(() => {
        cleanup();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('renders the SVG with goo filter', () => {
        const { container } = render(<Diagram />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute('viewBox', '0 0 800 500');

        const filter = container.querySelector('#goo');
        expect(filter).toBeInTheDocument();
    });

    it('renders four polygon areas', () => {
        const { container } = render(<Diagram />);
        const polygons = container.querySelectorAll('polygon');
        expect(polygons).toHaveLength(4);
    });

    it('renders labels for all skill areas', () => {
        render(<Diagram />);
        expect(screen.getByText('Front-end', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Leadership')).toBeInTheDocument();
        expect(screen.getByText('UI/UX Design')).toBeInTheDocument();
        expect(screen.getByText('AI expertize')).toBeInTheDocument();
    });

    it('shows keywords on polygon hover', async () => {
        const { container } = render(<Diagram />);
        const polygons = container.querySelectorAll('polygon');

        simulateAnimationComplete();

        await act(async () => {
            fireEvent.mouseEnter(polygons[0]);
        });
        // Double RAF for the double requestAnimationFrame in useHoverState
        await act(async () => {
            flushRaf();
            flushRaf();
        });

        const activeContainer = container.querySelector('[class*="active"]');
        expect(activeContainer).toBeTruthy();
    });

    it('hides keywords on mouse leave', async () => {
        const { container } = render(<Diagram />);
        const polygons = container.querySelectorAll('polygon');

        simulateAnimationComplete();

        await act(async () => {
            fireEvent.mouseEnter(polygons[0]);
        });
        // Double RAF for the double requestAnimationFrame in useHoverState
        await act(async () => {
            flushRaf();
            flushRaf();
        });

        await act(async () => {
            fireEvent.mouseLeave(polygons[0]);
            vi.advanceTimersByTime(700); // 100ms delay + 500ms animation + margin
        });

        const activeContainer = container.querySelector('[class*="active"]');
        expect(activeContainer).toBeNull();
    });

    it('sets up IntersectionObserver on mount', () => {
        render(<Diagram />);
        expect(mockObserve).toHaveBeenCalled();
    });

    it('disconnects IntersectionObserver on unmount', () => {
        const { unmount } = render(<Diagram />);
        unmount();
        expect(mockDisconnect).toHaveBeenCalled();
    });

    it('renders keywords for each skill area', () => {
        render(<Diagram />);
        expect(screen.getByText('Scalable SPA Architecture')).toBeInTheDocument();
        expect(screen.getByText('Trust-Based Mentorship')).toBeInTheDocument();
        expect(screen.getByText('GenAI Pair Programming')).toBeInTheDocument();
    });

    it('adds scroll listener when visible via IntersectionObserver', () => {
        const addEventSpy = vi.spyOn(window, 'addEventListener');
        render(<Diagram />);

        act(() => {
            mockIntersectionCallback(
                [{ isIntersecting: true } as IntersectionObserverEntry],
                {} as IntersectionObserver,
            );
        });

        expect(addEventSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
    });

    it('removes scroll listener when not visible', () => {
        const removeEventSpy = vi.spyOn(window, 'removeEventListener');
        render(<Diagram />);

        act(() => {
            mockIntersectionCallback(
                [{ isIntersecting: true } as IntersectionObserverEntry],
                {} as IntersectionObserver,
            );
        });

        act(() => {
            mockIntersectionCallback(
                [{ isIntersecting: false } as IntersectionObserverEntry],
                {} as IntersectionObserver,
            );
        });

        expect(removeEventSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });

    it('applies scale transform on hover to the correct polygon group', async () => {
        const { container } = render(<Diagram />);
        const polygons = container.querySelectorAll('polygon');

        simulateAnimationComplete();

        await act(async () => {
            fireEvent.mouseEnter(polygons[0]);
        });
        // Double RAF for the double requestAnimationFrame in useHoverState
        await act(async () => {
            flushRaf();
            flushRaf();
        });

        const groups = container.querySelectorAll('g[style]');
        const scaledGroup = Array.from(groups).find((g) =>
            (g as HTMLElement).style.transform.includes('scale(1.52'),
        );
        expect(scaledGroup).toBeTruthy();
    });

    it('marks other labels as inactive when one is hovered', async () => {
        const { container } = render(<Diagram />);
        const polygons = container.querySelectorAll('polygon');

        simulateAnimationComplete();

        await act(async () => {
            fireEvent.mouseEnter(polygons[0]);
        });
        // Double RAF for the double requestAnimationFrame in useHoverState
        await act(async () => {
            flushRaf();
            flushRaf();
        });

        const inactiveContainers = container.querySelectorAll('[class*="inactive"]');
        expect(inactiveContainers).toHaveLength(3);
    });
});
