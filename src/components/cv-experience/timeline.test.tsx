import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { Timeline } from './timeline';
import type { Job } from './content/jobs-data';

const { mockJobs, mockStyles } = vi.hoisted(() => {
    return {
        mockStyles: {
            timeline: 'timeline_mock',
            jobRow: 'jobRow_mock',
            jobsWrapper: 'jobsWrapper_mock',
            yearsWrapper: 'yearsWrapper_mock',
            job: 'job_mock',
            isBreak: 'isBreak_mock',
            isShort: 'isShort_mock',
            nowMarker: 'nowMarker_mock',
            year: 'year_mock',
            jobText: 'jobText_mock',
        },
        mockJobs: [
            {
                id: 'past-job',
                position: 'Junior Developer',
                company: 'Old Corp',
                skills: 'HTML, CSS',
                startDate: '2010-01',
                endDate: '2012-01',
                zIndex: 1,
            },
            {
                position: 'Gap Year',
                skills: 'Traveling',
                startDate: '2012-01',
                endDate: '2013-01',
                isBreak: true,
            },
            {
                id: 'current-job',
                position: 'Senior Engineer',
                company: 'New Tech',
                skills: 'React, TypeScript',
                startDate: '2013-01',
                endDate: new Date().toISOString(), // Ongoing
                zIndex: 2,
            },
            {
                id: 'short-job',
                position: 'Freelance Gig',
                company: 'Short Inc',
                skills: 'Quick work',
                startDate: '2015-06',
                endDate: '2015-07', // Very short duration
            }
        ] as Job[]
    };
});

// Mock SCSS modules
vi.mock('./timeline.module.scss', () => ({
    default: mockStyles
}));

// Mock the jobs-data module
vi.mock('./content/jobs-data', () => ({
    jobs: mockJobs
}));

describe('Timeline Component', () => {
    beforeEach(() => {
        vi.useFakeTimers();

        // Mock getElementById for scroll navigation
        vi.spyOn(document, 'getElementById').mockImplementation((id: string) => {
            if (id === 'experience') {
                return { offsetTop: 100 } as HTMLElement;
            }
            // Mock elements corresponding to IDs in mockJobs
            if (id === 'past-job' || id === 'current-job') {
                return { offsetTop: 500, offsetHeight: 100 } as HTMLElement;
            }
            return null;
        });

        // Mock window.scrollTo
        Object.defineProperty(window, 'scrollTo', {
            writable: true,
            value: vi.fn(),
        });
    });

    afterEach(() => {
        cleanup();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    const renderAndInitialize = async () => {
        const result = render(<Timeline />);
        // Allow useEffects/useLayoutEffect to settle
        await act(async () => {
            vi.advanceTimersByTime(100);
        });
        return result;
    };

    describe('Rendering', () => {
        it('renders the timeline container', async () => {
            const { container } = await renderAndInitialize();
            expect(container.firstChild).toHaveClass(mockStyles.timeline);
        });

        it('renders all mock jobs', async () => {
            await renderAndInitialize();
            expect(screen.getAllByText('Junior Developer', { exact: false })[0]).toBeInTheDocument();
            expect(screen.getAllByText('Gap Year', { exact: false })[0]).toBeInTheDocument();
            expect(screen.getAllByText('Senior Engineer', { exact: false })[0]).toBeInTheDocument();
            expect(screen.getAllByText('Freelance Gig', { exact: false })[0]).toBeInTheDocument();
        });

        it('renders correct styling for break entries', async () => {
            const { container } = await renderAndInitialize();
            // Use class selector since we mocked styles
            const breakElements = container.querySelectorAll(`.${mockStyles.isBreak}`);
            expect(breakElements.length).toBeGreaterThanOrEqual(1); // At least 1 break (might be split)
        });

        it('renders NOW marker', async () => {
            const { container } = await renderAndInitialize();
            const nowMarker = container.querySelector(`.${mockStyles.nowMarker}`);
            expect(nowMarker).toBeInTheDocument();
        });
    });

    describe('Layout Logic', () => {
        it('calculates start year based on first job + 1', async () => {
            // Logic: firstJobStartYear = new Date(jobs[0].startDate).getFullYear() + 1
            // 2010 + 1 = 2011
            await renderAndInitialize();
            // Should have markers starting from 2011
            expect(screen.queryAllByText('2011').length).toBeGreaterThan(0);
        });

        it('renders multiple rows if range is large', async () => {
            // Mock small screen width to force multiple rows
            Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 300 });

            const { container } = await renderAndInitialize();
            const rows = container.querySelectorAll(`.${mockStyles.jobRow}`);
            expect(rows.length).toBeGreaterThan(1);
        });

        it('short jobs have distinct class or styling', async () => {
            await renderAndInitialize();
            // Find short job element
            const shortJobText = screen.getAllByText('Freelance Gig', { exact: false })[0];
            const shortJobElement = shortJobText.closest(`.${mockStyles.job}`); // use mocked class

            expect(shortJobElement).toHaveClass(mockStyles.isShort);
        });
    });

    describe('Interactions', () => {
        it('scrolls to job when clicked if ID exists', async () => {
            await renderAndInitialize();
            // Use getAllByText as job might span multiple rows
            const jobElements = screen.getAllByText('Junior Developer', { exact: false });
            const jobElement = jobElements[0].closest(`.${mockStyles.job}`);

            expect(jobElement).toBeTruthy();
            if (jobElement) {
                await act(async () => {
                    fireEvent.click(jobElement!);
                });
                expect(window.scrollTo).toHaveBeenCalledWith(expect.objectContaining({
                    top: expect.any(Number),
                    behavior: 'smooth'
                }));
            }
        });

        it('does not scroll when clicked if ID is missing', async () => {
            await renderAndInitialize();
            const breakElements = screen.getAllByText('Gap Year', { exact: false });
            const breakElement = breakElements[0].closest(`.${mockStyles.job}`);

            expect(breakElement).toBeTruthy();
            if (breakElement) {
                await act(async () => {
                    fireEvent.click(breakElement!);
                });
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
            const initialRows = container.querySelectorAll(`.${mockStyles.jobRow}`);
            expect(initialRows.length).toBeGreaterThan(0);

            // Change mock width and trigger resize
            Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 300 });

            await act(async () => {
                fireEvent.resize(window);
                vi.advanceTimersByTime(100);
            });

            // This implicitly tests that state was updated. 
            // Since we forced small width, we definitely expect multiple rows.
            const afterRows = container.querySelectorAll(`.${mockStyles.jobRow}`);
            expect(afterRows.length).toBeGreaterThan(1);
        });
    });

    describe('Additional Layout Logic', () => {
        it('year markers wrapper exists in each row', async () => {
            const { container } = await renderAndInitialize();
            const jobRows = container.querySelectorAll(`.${mockStyles.jobRow}`);
            for (const row of jobRows) {
                const yearsWrapper = row.querySelector(`.${mockStyles.yearsWrapper}`);
                expect(yearsWrapper).toBeInTheDocument();
            }
        });

        it('jobs have position styles applied', async () => {
            const { container } = await renderAndInitialize();
            const jobElements = container.querySelectorAll(`.${mockStyles.job}`);
            for (const job of jobElements) {
                const style = (job as HTMLElement).style;
                expect(style.left).toBeTruthy();
                expect(style.width).toBeTruthy();
            }
        });
    });

    describe('Job Display Logic', () => {
        it('displays job position and company with comma separator', async () => {
            await renderAndInitialize();
            // Mock: "Junior Developer, Old Corp"
            expect(screen.getByText('Junior Developer', { exact: false })).toHaveTextContent(/Junior Developer,\s+Old Corp/);
        });

        it('displays only position for break entries without company', async () => {
            await renderAndInitialize();
            // Use getAllByText as job might span multiple rows
            const breakTexts = screen.getAllByText('Gap Year', { exact: false });
            const breakText = breakTexts[0].closest(`.${mockStyles.jobText}`);
            // Should NOT contain comma followed by company name characters
            expect(breakText?.textContent).not.toMatch(/Gap Year,\s+\w/);
        });
    });
});
