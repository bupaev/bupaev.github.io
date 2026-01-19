import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { Timeline } from './timeline';
import { jobs } from './content/jobs-data';

describe('Timeline Component', () => {
    beforeEach(() => {
        vi.useFakeTimers();

        // Mock getElementById for scroll navigation
        vi.spyOn(document, 'getElementById').mockImplementation((id: string) => {
            const elements: Record<string, { offsetTop: number; offsetHeight: number }> = {
                experience: { offsetTop: 1000, offsetHeight: 800 },
                freelance: { offsetTop: 100, offsetHeight: 150 },
                epam: { offsetTop: 400, offsetHeight: 200 },
                holmusk: { offsetTop: 300, offsetHeight: 150 },
            };
            return elements[id] as unknown as HTMLElement | null;
        });

        // Mock window.scrollTo
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
        const result = render(<Timeline />);
        await act(async () => {
            vi.advanceTimersByTime(100);
        });
        return result;
    };

    describe('Rendering', () => {
        it('renders the timeline container', async () => {
            const { container } = await renderAndInitialize();
            const timeline = container.querySelector('[class*="timeline"]');
            expect(timeline).toBeInTheDocument();
        });

        it('renders all jobs from the data', async () => {
            await renderAndInitialize();

            // Check that each job position is rendered (may appear in multiple rows)
            for (const job of jobs) {
                // Jobs should be rendered with their position title
                const jobElements = screen.getAllByText(job.position, { exact: false });
                expect(jobElements.length).toBeGreaterThan(0);
            }
        });

        it('renders correct number of unique job entries', async () => {
            const { container } = await renderAndInitialize();
            const jobElements = container.querySelectorAll('[class*=\"jobsWrapper\"] > [class*=\"job\"]');

            // Jobs can appear in multiple rows if they span row boundaries
            // Just verify we have a reasonable number of entries
            expect(jobElements.length).toBeGreaterThanOrEqual(10);
        });

        it('renders company names for jobs that have them', async () => {
            await renderAndInitialize();

            // Jobs with companies (use getAllByText as jobs may appear in multiple rows)
            expect(screen.getAllByText('Freelance').length).toBeGreaterThan(0);
            expect(screen.getAllByText('EPAM').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Holmusk').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Bandlab').length).toBeGreaterThan(0);
        });

        it('renders break entries with isBreak styling class', async () => {
            const { container } = await renderAndInitialize();

            // Find elements with isBreak class
            const breakElements = container.querySelectorAll('[class*="isBreak"]');

            // Should have 2 break entries: Sabbatical and Relocation
            expect(breakElements.length).toBe(2);
        });

        it('renders NOW marker in the last row', async () => {
            const { container } = await renderAndInitialize();
            const nowMarker = container.querySelector('[class*="nowMarker"]');
            expect(nowMarker).toBeInTheDocument();
        });

        it('renders year markers', async () => {
            await renderAndInitialize();

            // Check for specific years in the timeline (use getAllByText as years may repeat)
            expect(screen.getAllByText('2009').length).toBeGreaterThan(0);
            expect(screen.getAllByText('2021').length).toBeGreaterThan(0);
            expect(screen.getAllByText('2025').length).toBeGreaterThan(0);
        });
    });

    describe('Job Data Integrity', () => {
        it('renders skills as title attribute', async () => {
            const { container } = await renderAndInitialize();

            // Find job elements with title attributes
            const jobs = container.querySelectorAll('[title]');
            expect(jobs.length).toBeGreaterThan(0);

            // Check specific skill is in title
            const epamJob = Array.from(jobs).find(
                el => el.getAttribute('title')?.includes('TypeScript')
            );
            expect(epamJob).toBeTruthy();
        });

        it('first job starts in 2008', () => {
            expect(jobs[0].startDate).toBe('2008-08');
        });

        it('last job (Relocation) has dynamic end date', () => {
            const lastJob = jobs[jobs.length - 1];
            expect(lastJob.position).toBe('Relocation ✈️');
            // End date should be a valid ISO string (dynamic)
            expect(new Date(lastJob.endDate).getFullYear()).toBeGreaterThanOrEqual(2025);
        });

        it('EPAM job ends in September 2025', () => {
            const epamJob = jobs.find(job => job.company === 'EPAM');
            expect(epamJob?.endDate).toBe('2025-09');
        });

        it('jobs array has exactly 10 entries', () => {
            expect(jobs.length).toBe(10);
        });

        it('has exactly 2 break entries (Sabbatical and Relocation)', () => {
            const breaks = jobs.filter(job => job.isBreak);
            expect(breaks.length).toBe(2);
            expect(breaks[0].position).toContain('Sabbatical');
            expect(breaks[1].position).toContain('Relocation');
        });
    });

    describe('Click Navigation', () => {
        it('scrolls to job section when job with id is clicked', async () => {
            await renderAndInitialize();

            // Find the EPAM job element
            const epamJobText = screen.getAllByText('EPAM')[0];
            const epamJob = epamJobText.closest('[class*="job"]');

            expect(epamJob).toBeTruthy();

            if (epamJob) {
                await act(async () => {
                    fireEvent.click(epamJob);
                });

                expect(window.scrollTo).toHaveBeenCalledWith({
                    top: expect.any(Number),
                    left: 0,
                    behavior: 'smooth',
                });
            }
        });

        it('does not scroll when clicking job without id', async () => {
            await renderAndInitialize();

            // Sabbatical has no id
            const sabbaticalText = screen.getByText('Sabbatical ⛱️', { exact: false });
            const sabbaticalJob = sabbaticalText.closest('[class*="job"]');

            expect(sabbaticalJob).toBeTruthy();

            if (sabbaticalJob) {
                await act(async () => {
                    fireEvent.click(sabbaticalJob);
                });

                // Should not scroll since sabbatical has no id
                expect(window.scrollTo).not.toHaveBeenCalled();
            }
        });
    });

    describe('Resize Handling', () => {
        it('registers resize event listener on mount', async () => {
            const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

            await renderAndInitialize();

            expect(addEventListenerSpy).toHaveBeenCalledWith(
                'resize',
                expect.any(Function)
            );
        });

        it('removes resize event listener on unmount', async () => {
            const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

            const { unmount } = await renderAndInitialize();
            unmount();

            expect(removeEventListenerSpy).toHaveBeenCalledWith(
                'resize',
                expect.any(Function)
            );
        });

        it('updates layout on resize', async () => {
            const { container } = await renderAndInitialize();

            // Verify initial rows exist
            const initialRows = container.querySelectorAll('[class*="jobRow"]');
            expect(initialRows.length).toBeGreaterThan(0);

            // Simulate resize
            await act(async () => {
                fireEvent.resize(window);
            });

            // Layout should still render correctly
            const afterRows = container.querySelectorAll('[class*="jobRow"]');
            expect(afterRows.length).toBeGreaterThan(0);
        });
    });

    describe('Layout Calculations', () => {
        it('splits jobs into multiple rows', async () => {
            const { container } = await renderAndInitialize();

            const jobRows = container.querySelectorAll('[class*="jobRow"]');

            // With ~17 years of history, should have multiple rows
            expect(jobRows.length).toBeGreaterThan(1);
        });

        it('year markers wrapper exists in each row', async () => {
            const { container } = await renderAndInitialize();

            const jobRows = container.querySelectorAll('[class*="jobRow"]');

            for (const row of jobRows) {
                const yearsWrapper = row.querySelector('[class*="yearsWrapper"]');
                expect(yearsWrapper).toBeInTheDocument();
            }
        });

        it('jobs have position styles applied', async () => {
            const { container } = await renderAndInitialize();

            const jobElements = container.querySelectorAll('[class*="job"]:not([class*="jobRow"]):not([class*="jobsWrapper"]):not([class*="jobText"])');

            for (const job of jobElements) {
                const style = (job as HTMLElement).style;
                // Jobs should have positioning styles
                expect(style.left).toBeTruthy();
                expect(style.width).toBeTruthy();
            }
        });

        it('NOW marker has position style applied', async () => {
            const { container } = await renderAndInitialize();

            const nowMarker = container.querySelector('[class*="nowMarker"]') as HTMLElement;
            expect(nowMarker).toBeInTheDocument();
            expect(nowMarker?.style.left).toBeTruthy();
        });
    });

    describe('Job Display Logic', () => {
        it('displays job position and company with comma separator', async () => {
            const { container } = await renderAndInitialize();

            // For jobs with company, should show "Position, Company"
            const epamJobTexts = container.querySelectorAll('[class*="jobText"]');
            const epamJob = Array.from(epamJobTexts).find(
                el => el.textContent?.includes('Lead Front-end engineer') && el.textContent?.includes('EPAM')
            );
            expect(epamJob).toBeTruthy();
        });

        it('displays only position for breaks without company', async () => {
            await renderAndInitialize();

            // Sabbatical has no company - find first occurrence
            const sabbaticalElements = screen.getAllByText('Sabbatical ⛱️', { exact: false });
            const parent = sabbaticalElements[0].closest('[class*="job"]');

            // Should not contain comma followed by company name
            expect(parent?.textContent).not.toMatch(/Sabbatical.*,\s+\w/);
        });
    });
});
