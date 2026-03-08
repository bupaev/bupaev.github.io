import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Overview } from './overview';

vi.mock('./index', () => ({
    Diagram: () => <div data-testid="diagram" />,
}));

describe('Overview', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders the core heading', () => {
        render(<Overview />);
        expect(screen.getByText('My Professional Core')).toBeInTheDocument();
    });

    it('renders the Diagram component', () => {
        render(<Overview />);
        expect(screen.getByTestId('diagram')).toBeInTheDocument();
    });

    it('renders strategic identity list items', () => {
        render(<Overview />);
        expect(screen.getByText('Product-Oriented:', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Big-Picture Thinker:', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Perfectionist:', { exact: false })).toBeInTheDocument();
    });
});
