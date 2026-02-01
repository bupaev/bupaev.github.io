import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';
import { VennDiagramProfessions } from './venn-diagram-professions';

describe('VennDiagramProfessions', () => {
    let mockResizeObserverCallback: ResizeObserverCallback;
    const mockDisconnect = vi.fn();

    beforeEach(() => {
        vi.stubGlobal('ResizeObserver', vi.fn(function (this: unknown, callback: ResizeObserverCallback) {
            mockResizeObserverCallback = callback;
            return {
                observe: vi.fn(),
                unobserve: vi.fn(),
                disconnect: mockDisconnect,
            };
        }));
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('renders the three circles with titles', () => {
        render(<VennDiagramProfessions />);
        expect(screen.getByText('Back End')).toBeInTheDocument();
        expect(screen.getByText('Front End')).toBeInTheDocument();
        expect(screen.getByText('UI/UX Design')).toBeInTheDocument();
    });

    it('renders the Unicorn Area center text', () => {
        render(<VennDiagramProfessions />);
        expect(screen.getByText('Unicorn', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Area', { exact: false })).toBeInTheDocument();
    });

    it('renders the speech bubble', () => {
        render(<VennDiagramProfessions />);
        expect(screen.getByText("Hi! It's me!")).toBeInTheDocument();
    });

    it('renders the HeadIcon SVG', () => {
        const { container } = render(<VennDiagramProfessions />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute('viewBox', '0 0 400 512');
    });

    it('sets font size based on ResizeObserver', () => {
        const { container } = render(<VennDiagramProfessions />);

        act(() => {
            mockResizeObserverCallback(
                [{ contentRect: { width: 400 } } as ResizeObserverEntry],
                {} as ResizeObserver,
            );
        });

        const root = container.firstChild as HTMLElement;
        // 400 / 20 = 20px
        expect(root.style.fontSize).toBe('20px');
    });

    it('disconnects ResizeObserver on unmount', () => {
        const { unmount } = render(<VennDiagramProfessions />);
        unmount();
        expect(mockDisconnect).toHaveBeenCalled();
    });
});
