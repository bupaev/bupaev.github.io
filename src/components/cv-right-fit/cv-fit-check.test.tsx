import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { CvFitCheck } from './cv-fit-check';

describe('CvFitCheck', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders the section heading', () => {
        render(<CvFitCheck />);
        expect(screen.getByText('Are We the Right Fit?')).toBeInTheDocument();
    });

    it('renders the subtitle', () => {
        render(<CvFitCheck />);
        expect(
            screen.getByText(/reasonable perfectionist who cares about the product/),
        ).toBeInTheDocument();
    });

    it('renders all 6 criteria titles', () => {
        render(<CvFitCheck />);
        expect(screen.getByText('Product Complexity')).toBeInTheDocument();
        expect(screen.getByText('Engineering Balance')).toBeInTheDocument();
        expect(screen.getByText('Product Mindset')).toBeInTheDocument();
        expect(screen.getByText('Design & Process')).toBeInTheDocument();
        expect(screen.getByText('Team Culture')).toBeInTheDocument();
        expect(screen.getByText('AI & Innovation')).toBeInTheDocument();
    });

    it('renders "I Fit" labels for all criteria', () => {
        render(<CvFitCheck />);
        const fitLabels = screen.getAllByText('I Fit');
        expect(fitLabels).toHaveLength(6);
    });

    it('renders "I Don\'t Fit" labels for all criteria', () => {
        render(<CvFitCheck />);
        const noFitLabels = screen.getAllByText("I Don't Fit");
        expect(noFitLabels).toHaveLength(6);
    });

    it('renders fit and no-fit card text for Product Complexity', () => {
        render(<CvFitCheck />);
        expect(
            screen.getByText(/complex, feature-rich interfaces/),
        ).toBeInTheDocument();
        expect(
            screen.getByText(/basic interfaces for simple CRUD/),
        ).toBeInTheDocument();
    });

    it('renders check and cross indicators', () => {
        render(<CvFitCheck />);
        const checkMarks = screen.getAllByText('✓');
        const crossMarks = screen.getAllByText('✗');
        expect(checkMarks).toHaveLength(6);
        expect(crossMarks).toHaveLength(6);
    });
});
