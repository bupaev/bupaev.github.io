import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { CvOverview } from './cv-overview';

vi.mock('./index', () => ({
    Diagram: () => <div data-testid="diagram" />,
}));

describe('CvOverview', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders the core heading', () => {
        render(<CvOverview />);
        expect(screen.getByText('My Professional Core')).toBeInTheDocument();
    });

    it('renders the Diagram component', () => {
        render(<CvOverview />);
        expect(screen.getByTestId('diagram')).toBeInTheDocument();
    });

    it('renders strategic identity list items', () => {
        render(<CvOverview />);
        expect(screen.getByText('Technical Orchestrator:', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('T-Shaped Leader:', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Critical Systems Thinker:', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Human-Centric Engineer:', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('High-Leverage Engineer:', { exact: false })).toBeInTheDocument();
    });
});
