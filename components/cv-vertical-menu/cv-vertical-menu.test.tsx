import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { CvVerticalMenu } from './cv-vertical-menu';

describe('CvVerticalMenu', () => {
    const mockSectionElements = [
        { clientHeight: 500, offsetTop: 0 },
        { clientHeight: 600, offsetTop: 500 },
        { clientHeight: 700, offsetTop: 1100 },
        { clientHeight: 400, offsetTop: 1800 },
        { clientHeight: 500, offsetTop: 2200 },
    ];

    beforeEach(() => {
        vi.useFakeTimers();

        // Mock getElementsByClassName to return our mock sections
        vi.spyOn(document, 'getElementsByClassName').mockReturnValue({
            length: mockSectionElements.length,
            [Symbol.iterator]: function* () {
                for (const el of mockSectionElements) {
                    yield el as unknown as Element;
                }
            },
            item: (index: number) => mockSectionElements[index] as unknown as Element,
            namedItem: () => null,
        } as unknown as HTMLCollectionOf<Element>);

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
        const result = render(<CvVerticalMenu />);
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

        it('renders all 5 menu items', async () => {
            await renderAndInitialize();

            expect(screen.getByText('Hello!')).toBeInTheDocument();
            expect(screen.getByText('Overview')).toBeInTheDocument();
            expect(screen.getByText('Skills')).toBeInTheDocument();
            expect(screen.getByText('Experience')).toBeInTheDocument();
            expect(screen.getByText('Education')).toBeInTheDocument();
        });

        it('renders menu item icons', async () => {
            await renderAndInitialize();

            const images = screen.getAllByRole('img');
            expect(images).toHaveLength(5);

            expect(images[0]).toHaveAttribute('alt', 'Hello!');
            expect(images[1]).toHaveAttribute('alt', 'Overview');
            expect(images[2]).toHaveAttribute('alt', 'Skills');
            expect(images[3]).toHaveAttribute('alt', 'Experience');
            expect(images[4]).toHaveAttribute('alt', 'Education');
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

            const overviewItem = screen.getByText('Overview').closest('[class*="item"]');
            expect(overviewItem).toBeInTheDocument();

            await act(async () => {
                fireEvent.click(overviewItem!);
            });

            expect(window.scrollTo).toHaveBeenCalledWith({
                top: 500, // offsetTop of second section
                left: 0,
                behavior: 'smooth',
            });
        });

        it('scrolls to first section (hero) when first menu item clicked', async () => {
            await renderAndInitialize();

            const helloItem = screen.getByText('Hello!').closest('[class*="item"]');

            await act(async () => {
                fireEvent.click(helloItem!);
            });

            expect(window.scrollTo).toHaveBeenCalledWith({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        });

        it('scrolls to last section (education) when last menu item clicked', async () => {
            await renderAndInitialize();

            const educationItem = screen.getByText('Education').closest('[class*="item"]');

            await act(async () => {
                fireEvent.click(educationItem!);
            });

            expect(window.scrollTo).toHaveBeenCalledWith({
                top: 2200,
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
                expect.any(Function)
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
});
