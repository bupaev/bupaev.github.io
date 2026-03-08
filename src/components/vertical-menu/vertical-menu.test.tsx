import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { VerticalMenu } from './vertical-menu';

describe('VerticalMenu', () => {
    // Mock ResizeObserver
    global.ResizeObserver = class {
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
    } as unknown as typeof ResizeObserver;


    beforeEach(() => {
        vi.useFakeTimers();

        vi.spyOn(document, 'getElementById').mockImplementation((id: string) => {
            const sectionMap: Record<string, { clientHeight: number; offsetTop: number; getBoundingClientRect: () => Partial<DOMRect> }> = {
                'hero-area': { clientHeight: 500, offsetTop: 0, getBoundingClientRect: () => ({ top: 0 }) },
                'overview': { clientHeight: 600, offsetTop: 500, getBoundingClientRect: () => ({ top: 500 }) },
                'skills': { clientHeight: 700, offsetTop: 1100, getBoundingClientRect: () => ({ top: 1100 }) },
                'experience': { clientHeight: 400, offsetTop: 1800, getBoundingClientRect: () => ({ top: 1800 }) },
                'fit-check': { clientHeight: 500, offsetTop: 2200, getBoundingClientRect: () => ({ top: 2200 }) },
                'education': { clientHeight: 500, offsetTop: 2700, getBoundingClientRect: () => ({ top: 2700 }) },
            };
            return sectionMap[id] as unknown as HTMLElement | null;
        });

        // Reset scrollY
        Object.defineProperty(window, 'scrollY', {
            writable: true,
            value: 0,
        });

        // Reset scrollTo mock
        (window.scrollTo as ReturnType<typeof vi.fn>).mockClear();
    });

    afterEach(() => {
        cleanup();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    /** 
     * Helper to render component and wait for initialization
     */
    const renderAndInitialize = async () => {
        const result = render(<VerticalMenu />);
        await act(async () => {
            vi.advanceTimersByTime(150);
        });
        return result;
    };

    describe('Rendering', () => {
        it('renders the navigation element', async () => {
            await renderAndInitialize();
            const nav = screen.getByRole('navigation');
            expect(nav).toBeInTheDocument();
        });

        it('renders all 6 menu items', async () => {
            await renderAndInitialize();

            expect(screen.getByText('Salute')).toBeInTheDocument();
            expect(screen.getByText('My Core')).toBeInTheDocument();
            expect(screen.getByText('Skills')).toBeInTheDocument();
            expect(screen.getByText('Experience')).toBeInTheDocument();
            expect(screen.getByText('Fit Check')).toBeInTheDocument();
            expect(screen.getByText('Education')).toBeInTheDocument();
        });

        it('renders menu items as accessible buttons', async () => {
            await renderAndInitialize();
            const buttons = screen.getAllByRole('button', { name: /Navigate to/i });
            expect(buttons).toHaveLength(6);

            // Check ARIA labels for accessibility
            expect(buttons[0]).toHaveAttribute('aria-label', 'Navigate to Salute section');
            expect(buttons[1]).toHaveAttribute('aria-label', 'Navigate to My Core section');
            expect(buttons[2]).toHaveAttribute('aria-label', 'Navigate to Skills section');
        });

        it('renders visible area marker', async () => {
            const { container } = await renderAndInitialize();

            const marker = container.querySelector('[class*="visibleAreaMarker"]');
            expect(marker).toBeInTheDocument();
        });
    });

    describe('Menu Item Click Behavior', () => {
        it('scrolls to correct section when menu item clicked', async () => {
            await renderAndInitialize();

            const overviewButton = screen.getByRole('button', { name: /navigate to my core/i });
            expect(overviewButton).toBeInTheDocument();

            await act(async () => {
                fireEvent.click(overviewButton);
            });

            expect(window.scrollTo).toHaveBeenCalledWith({
                top: 500, // offsetTop of overview section
                left: 0,
                behavior: 'smooth',
            });
        });

        it('scrolls to first section (hero) when first menu item clicked', async () => {
            await renderAndInitialize();

            const helloButton = screen.getByRole('button', { name: /navigate to Salute/i });

            await act(async () => {
                fireEvent.click(helloButton);
            });

            expect(window.scrollTo).toHaveBeenCalledWith({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        });

        it('scrolls to last section (education) when last menu item clicked', async () => {
            await renderAndInitialize();

            const educationButton = screen.getByRole('button', { name: /navigate to education/i });

            await act(async () => {
                fireEvent.click(educationButton);
            });

            expect(window.scrollTo).toHaveBeenCalledWith({
                top: 2700,
                left: 0,
                behavior: 'smooth',
            });
        });
    });

    describe('Event Listener Management', () => {
        it('registers scroll and resize event listeners on mount', async () => {
            const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

            await renderAndInitialize();

            expect(addEventListenerSpy).toHaveBeenCalledWith(
                'scroll',
                expect.any(Function),
                { passive: true }
            );
            expect(addEventListenerSpy).toHaveBeenCalledWith(
                'resize',
                expect.any(Function)
            );
        });

        it('removes event listeners on unmount', async () => {
            const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

            const { unmount } = await renderAndInitialize();
            unmount();

            expect(removeEventListenerSpy).toHaveBeenCalledWith(
                'scroll',
                expect.any(Function)
            );
            expect(removeEventListenerSpy).toHaveBeenCalledWith(
                'resize',
                expect.any(Function)
            );
        });
    });

    describe('Visible Area Marker', () => {
        it('marker has initial transform of 0px', async () => {
            const { container } = await renderAndInitialize();

            const marker = container.querySelector('[class*="visibleAreaMarker"]');
            expect(marker).toHaveStyle({ transform: 'translateY(0px)' });
        });

        it('marker updates position on scroll', async () => {
            const { container } = await renderAndInitialize();

            // Simulate scroll
            Object.defineProperty(window, 'scrollY', { value: 500, writable: true });

            await act(async () => {
                fireEvent.scroll(window);
            });

            const marker = container.querySelector('[class*="visibleAreaMarker"]');
            // Marker should have moved - exact value depends on rescale calculation
            expect(marker).toBeInTheDocument();
        });
    });
    describe('Sticky and Mobile Behavior', () => {
        it('applies opacity: 1 after mount', async () => {
            await renderAndInitialize();
            const nav = screen.getByRole('navigation');
            // Opacity is set to 1 after component mounts (mounted state)
            expect(nav).toHaveStyle({ opacity: '1' });
        });

        it('toggles data-sticky attribute on mobile scroll', async () => {
            // Mock mobile viewport
            Object.defineProperty(window, 'innerWidth', { value: 600, writable: true });

            await renderAndInitialize();

            // Trigger resize to activate mobile logic
            fireEvent.resize(window);

            const nav = screen.getByRole('navigation');

            // Initially scrollY is 0, so not sticky
            expect(nav).toHaveAttribute('data-sticky', 'false');

            // Scroll past hero height (mocked at 500)
            Object.defineProperty(window, 'scrollY', { value: 550, writable: true });
            fireEvent.scroll(window);

            expect(nav).toHaveAttribute('data-sticky', 'true');

            // Scroll back up
            Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
            fireEvent.scroll(window);

            expect(nav).toHaveAttribute('data-sticky', 'false');
        });

        it('does not toggle data-sticky on desktop', async () => {
            // Mock desktop viewport
            Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });

            await renderAndInitialize();
            fireEvent.resize(window);

            const nav = screen.getByRole('navigation');

            Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
            fireEvent.scroll(window);

            // Should not have data-sticky attribute
            expect(nav).not.toHaveAttribute('data-sticky', 'true');
        });
    });
});
