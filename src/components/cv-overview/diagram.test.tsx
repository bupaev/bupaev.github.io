import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act, within } from '@testing-library/react';
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

        // Mock matchMedia
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(), // deprecated
                removeListener: vi.fn(), // deprecated
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });

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

    const activateArea = async (container: HTMLElement, areaIndex: number) => {
        const areas = container.querySelectorAll('polygon');
        simulateAnimationComplete();

        await act(async () => {
            fireEvent.mouseEnter(areas[areaIndex]);
        });
        // Double RAF for the double requestAnimationFrame in useActiveArea
        await act(async () => {
            flushRaf();
            flushRaf();
        });
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

    it('renders four skill areas', () => {
        const { container } = render(<Diagram />);
        const areas = container.querySelectorAll('polygon');
        expect(areas).toHaveLength(4);
    });

    it('renders headings for all skill areas', () => {
        render(<Diagram />);
        expect(screen.getByText(/Software/, { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Leadership')).toBeInTheDocument();
        expect(screen.getByText('UI/UX Design')).toBeInTheDocument();
        expect(screen.getByText('AI expertize')).toBeInTheDocument();
    });

    it('shows topics on area hover', async () => {
        const { container } = render(<Diagram />);

        await activateArea(container, 0);

        const activeContainer = container.querySelector('[class*="active"]');
        expect(activeContainer).toBeTruthy();
    });

    it('hides topics on mouse leave', async () => {
        const { container } = render(<Diagram />);
        const areas = container.querySelectorAll('polygon');

        await activateArea(container, 0);

        await act(async () => {
            fireEvent.mouseLeave(areas[0]);
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

    it('renders topics for each skill area', () => {
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

    it('applies scale transform on hover to the correct area group', async () => {
        const { container } = render(<Diagram />);

        await activateArea(container, 0);

        const groups = container.querySelectorAll('g[style]');
        const scaledGroup = Array.from(groups).find((g) =>
            (g as HTMLElement).style.transform.includes('scale(1.4'),
        );
        expect(scaledGroup).toBeTruthy();
    });

    it('marks other headings as inactive when one is hovered', async () => {
        const { container } = render(<Diagram />);

        await activateArea(container, 0);

        const inactiveContainers = container.querySelectorAll('[class*="inactive"]');
        expect(inactiveContainers).toHaveLength(3);
    });

    it('opens topic popup on click and closes via close button', async () => {
        render(<Diagram />);
        const topicName = 'Scalable SPA Architecture';
        // Get button specifically
        const topicButton = screen.getByText(topicName).closest('button');
        expect(topicButton).toBeTruthy();

        // Click topic to open portal
        await act(async () => {
            fireEvent.click(topicButton!);
        });

        // Manually flush effects and rAFs to ensure portal renders
        await act(async () => {
            vi.runAllTimers();
            flushRaf(); // TopicPortal mount
            flushRaf(); // First rAF
            flushRaf(); // Second rAF (setIsAnimating)
        });

        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        
        // Use within to find the heading inside the dialog
        const heading = within(dialog).getByRole('heading', { name: topicName });
        expect(heading).toBeInTheDocument();

        // Check close button
        const closeBtn = screen.getByLabelText('Close');
        
        // Verify mouse leave does NOT close it
        await act(async () => {
            fireEvent.mouseLeave(dialog);
            vi.advanceTimersByTime(1000);
        });
        expect(dialog).toBeInTheDocument();

        // Click close button
        await act(async () => {
            fireEvent.click(closeBtn);
        });

        // Wait for exit animations
        await act(async () => {
            vi.runAllTimers();
        });

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('keeps area active after closing popup via close button', async () => {
        const { container } = render(<Diagram />);

        // Activate the first area (topLeft = Software Engineering)
        await activateArea(container, 0);

        // Open a topic popup
        const topicButton = screen.getByText('Scalable SPA Architecture').closest('button');
        await act(async () => {
            fireEvent.click(topicButton!);
        });

        await act(async () => {
            vi.runAllTimers();
            flushRaf();
            flushRaf();
            flushRaf();
        });

        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();

        // Click close button
        const closeBtn = screen.getByLabelText('Close');
        await act(async () => {
            fireEvent.click(closeBtn);
        });

        await act(async () => {
            vi.runAllTimers();
        });

        // The area should STILL be active after closing the popup
        const activeContainer = container.querySelector('[class*="active"]');
        expect(activeContainer).toBeTruthy();
    });

    it('keeps area active after closing popup by clicking outside', async () => {
        const { container } = render(<Diagram />);

        // Activate the first area
        await activateArea(container, 0);

        // Open a topic popup
        const topicButton = screen.getByText('Scalable SPA Architecture').closest('button');
        await act(async () => {
            fireEvent.click(topicButton!);
        });

        await act(async () => {
            vi.runAllTimers();
            flushRaf();
            flushRaf();
            flushRaf();
        });

        expect(screen.getByRole('dialog')).toBeInTheDocument();

        // Click outside the popup (on document body)
        await act(async () => {
            fireEvent.click(document.body);
        });

        await act(async () => {
            vi.runAllTimers();
        });

        // The area should STILL be active after outside click closes the popup
        const activeContainer = container.querySelector('[class*="active"]');
        expect(activeContainer).toBeTruthy();
    });

    it('does not change active area when mouse events fire while popup is open', async () => {
        const { container } = render(<Diagram />);
        const areas = container.querySelectorAll('polygon');

        // Activate first area
        await activateArea(container, 0);

        // Open a topic popup
        const topicButton = screen.getByText('Scalable SPA Architecture').closest('button');
        await act(async () => {
            fireEvent.click(topicButton!);
        });

        await act(async () => {
            vi.runAllTimers();
            flushRaf();
            flushRaf();
            flushRaf();
        });

        // While popup is open, try to hover a different area
        await act(async () => {
            fireEvent.mouseLeave(areas[0]);
            fireEvent.mouseEnter(areas[1]);
        });
        await act(async () => {
            flushRaf();
            flushRaf();
        });

        // The scaled group should still be for the first area, not the second
        const groups = container.querySelectorAll('g[style]');
        const scaledGroup = Array.from(groups).find((g) =>
            (g as HTMLElement).style.transform.includes('scale(1.4'),
        );
        expect(scaledGroup).toBeTruthy();
    });
});
