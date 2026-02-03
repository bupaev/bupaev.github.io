import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { KeywordPopup } from './keyword-popup';

describe('KeywordPopup', () => {
    const mockKeyword = {
        name: 'Test Keyword',
        description: 'This is a test description for the keyword.',
    };

    const mockPosition = { x: 100, y: 200 };
    const mockOnClose = vi.fn();

    beforeEach(() => {
        vi.useFakeTimers();
        mockOnClose.mockClear();
    });

    afterEach(() => {
        cleanup();
        vi.useRealTimers();
    });

    it('renders keyword name and description', () => {
        render(
            <KeywordPopup
                keyword={mockKeyword}
                position={mockPosition}
                onClose={mockOnClose}
            />
        );

        expect(screen.getByText('Test Keyword')).toBeInTheDocument();
        expect(screen.getByText('This is a test description for the keyword.')).toBeInTheDocument();
    });

    it('renders via portal to document body', () => {
        const { baseElement } = render(
            <KeywordPopup
                keyword={mockKeyword}
                position={mockPosition}
                onClose={mockOnClose}
            />
        );

        const popup = baseElement.querySelector('[role="dialog"]');
        expect(popup).toBeInTheDocument();
        expect(popup?.parentElement).toBe(document.body);
    });

    it('closes on close button click', () => {
        render(
            <KeywordPopup
                keyword={mockKeyword}
                position={mockPosition}
                onClose={mockOnClose}
            />
        );

        const closeButton = screen.getByLabelText('Close popup');
        fireEvent.click(closeButton);

        // Wait for exit animation delay
        vi.advanceTimersByTime(150);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('closes on Escape key press', () => {
        render(
            <KeywordPopup
                keyword={mockKeyword}
                position={mockPosition}
                onClose={mockOnClose}
            />
        );

        // Advance timers to allow event listeners to be attached
        vi.advanceTimersByTime(10);

        fireEvent.keyDown(document, { key: 'Escape' });

        // Wait for exit animation delay
        vi.advanceTimersByTime(150);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('closes on click outside popup', () => {
        render(
            <KeywordPopup
                keyword={mockKeyword}
                position={mockPosition}
                onClose={mockOnClose}
            />
        );

        // Advance timers to allow event listeners to be attached
        vi.advanceTimersByTime(10);

        fireEvent.mouseDown(document.body);

        // Wait for exit animation delay
        vi.advanceTimersByTime(150);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('positions popup at specified coordinates', () => {
        const { baseElement } = render(
            <KeywordPopup
                keyword={mockKeyword}
                position={{ x: 150, y: 250 }}
                onClose={mockOnClose}
            />
        );

        const popup = baseElement.querySelector('[role="dialog"]') as HTMLElement;
        expect(popup.style.left).toBe('150px');
        expect(popup.style.top).toBe('250px');
    });

    it('has accessible role and aria attributes', () => {
        render(
            <KeywordPopup
                keyword={mockKeyword}
                position={mockPosition}
                onClose={mockOnClose}
            />
        );

        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog).toHaveAttribute('aria-labelledby', 'popup-keyword-name');
    });
});
