import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { FitCheck } from './fit-check';

describe('FitCheck', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders the section heading', () => {
        render(<FitCheck />);
        expect(screen.getByText('Are We the Right Fit?')).toBeInTheDocument();
    });

    it('renders the subtitle', () => {
        render(<FitCheck />);
        expect(
            screen.getByText(/Here is a quick, honest look at how I work/),
        ).toBeInTheDocument();
    });

    it('renders all active criteria titles', () => {
        render(<FitCheck />);
        expect(screen.getByText('Dedication to Success')).toBeInTheDocument();
        expect(screen.getByText('Technical Breadth')).toBeInTheDocument();
        expect(screen.getByText('Product Complexity')).toBeInTheDocument();
        expect(screen.getByText('Sustainable Balance')).toBeInTheDocument();
        expect(screen.getByText('AI & Innovation')).toBeInTheDocument();
    });

    it('renders "Fit" labels for all criteria', () => {
        render(<FitCheck />);
        const fitLabels = screen.getAllByText(/GREAT FIT if/i);
        expect(fitLabels).toHaveLength(6); // 5 cards + 1 header
    });

    it('renders "No Fit" labels for all criteria', () => {
        render(<FitCheck />);
        const noFitLabels = screen.getAllByText(/NOT A FIT if/i);
        expect(noFitLabels).toHaveLength(6); // 5 cards + 1 header
    });

    it('renders fit and no-fit card text for Dedication to Success', () => {
        render(<FitCheck />);
        expect(
            screen.getByText(/genuinely interested in your product's success/),
        ).toBeInTheDocument();
        expect(
            screen.getByText(/indifferent to the success of the product/),
        ).toBeInTheDocument();
    });
});
