import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { CvOverview } from './cv-overview';

vi.mock('./venn-diagram-professions', () => ({
    VennDiagramProfessions: () => <div data-testid="venn-diagram" />,
}));

vi.mock('./index', () => ({
    Diagram: () => <div data-testid="diagram" />,
}));

describe('CvOverview', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders the Overview heading', () => {
        render(<CvOverview />);
        expect(screen.getByText('Overview')).toBeInTheDocument();
    });

    it('renders the Diagram component', () => {
        render(<CvOverview />);
        expect(screen.getByTestId('diagram')).toBeInTheDocument();
    });

    it('renders the VennDiagramProfessions component', () => {
        render(<CvOverview />);
        expect(screen.getByTestId('venn-diagram')).toBeInTheDocument();
    });

    it('renders strategic identity list items', () => {
        render(<CvOverview />);
        expect(screen.getByText('Technical Orchestrator:', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('T-Shaped Leader:', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Critical Systems Thinker:', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Human-Centric Engineer:', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('High-Leverage Engineer:', { exact: false })).toBeInTheDocument();
    });

    it('renders external links with correct attributes', () => {
        render(<CvOverview />);
        const bandlabLink = screen.getByText('multitrack audio workstation');
        expect(bandlabLink).toHaveAttribute('href', 'https://www.bandlab.com/creation-features');
        expect(bandlabLink).toHaveAttribute('target', '_blank');
        expect(bandlabLink).toHaveAttribute('rel', 'noopener noreferrer');

        const holmuskLink = screen.getByText('electronic health record system');
        expect(holmuskLink).toHaveAttribute('href', 'https://www.holmusk.com/solutions');
        expect(holmuskLink).toHaveAttribute('target', '_blank');
    });
});
