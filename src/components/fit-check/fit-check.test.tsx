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
            screen.getByText(/To save our mutual time, here is a breakdown/),
        ).toBeInTheDocument();
    });

    it('renders all 6 criteria titles', () => {
        render(<FitCheck />);
        expect(screen.getByText('Product Complexity')).toBeInTheDocument();
        expect(screen.getByText('Engineering Balance')).toBeInTheDocument();
        expect(screen.getByText('Product Mindset')).toBeInTheDocument();
        expect(screen.getByText('Design & Process')).toBeInTheDocument();
        expect(screen.getByText('Team Culture')).toBeInTheDocument();
        expect(screen.getByText('AI & Innovation')).toBeInTheDocument();
    });

    it('renders "We Fit" labels for all criteria', () => {
        render(<FitCheck />);
        const fitLabels = screen.getAllByText(/We Fit/i);
        expect(fitLabels).toHaveLength(7); // 6 cards + 1 header
    });

    it('renders "We Don\'t Fit" labels for all criteria', () => {
        render(<FitCheck />);
        const noFitLabels = screen.getAllByText(/We Don't Fit/i);
        expect(noFitLabels).toHaveLength(7); // 6 cards + 1 header
    });

    it('renders fit and no-fit card text for Product Complexity', () => {
        render(<FitCheck />);
        expect(
            screen.getByText(/complex, feature-rich interfaces/),
        ).toBeInTheDocument();
        expect(
            screen.getByText(/basic interfaces for simple CRUD/),
        ).toBeInTheDocument();
    });
});
