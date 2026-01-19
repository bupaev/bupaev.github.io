import { test, expect } from '@playwright/test';

test.describe('CV Experience Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/cv');
        await page.waitForLoadState('domcontentloaded');
    });

    test.describe('Experience Section Structure', () => {
        test('experience section is visible', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();
            await expect(experienceSection).toBeVisible();
        });

        test('experience section has correct heading', async ({ page }) => {
            const heading = page.locator('#experience h2');
            await expect(heading).toContainText('Experience');
        });

        test('experience section contains timeline component', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            // Timeline should render job rows
            const jobRows = page.locator('#experience [class*="jobRow"]');
            await expect(jobRows.first()).toBeVisible();
            const count = await jobRows.count();
            expect(count).toBeGreaterThan(0);
        });

        test('experience section contains job descriptions content', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            // Check for job content (from MDX)
            const content = page.locator('#experience .content').first();
            await expect(content).toBeVisible();
        });
    });

    test.describe('Timeline Visual Rendering', () => {
        test('timeline renders multiple job rows', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            const jobRows = page.locator('[class*="jobRow"]');
            await expect(jobRows.first()).toBeVisible();
            const count = await jobRows.count();

            // Should have at least 2 rows (spanning ~17 years)
            expect(count).toBeGreaterThanOrEqual(2);
        });

        test('timeline renders all expected jobs', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            // Check for specific job positions in any element
            const expectedJobs = [
                'Software developer',
                'Teaching Assistant',
                'Web developer',
                'Lead Front-end engineer',
                'EPAM',
                'Holmusk',
            ];

            for (const job of expectedJobs) {
                const jobElement = experienceSection.getByText(job, { exact: false });
                await expect(jobElement.first()).toBeVisible();
            }
        });

        test('timeline renders Sabbatical with break styling', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            const sabbatical = page.locator('[class*="isBreak"]').filter({ hasText: 'Sabbatical' });
            await expect(sabbatical.first()).toBeVisible();
        });

        test('timeline renders Relocation with break styling', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            const relocation = page.locator('[class*="isBreak"]').filter({ hasText: /Relocation/ });
            await expect(relocation.first()).toBeVisible();
        });

        test('timeline renders NOW marker', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            const nowMarker = page.locator('[class*="nowMarker"]');
            await expect(nowMarker).toBeVisible();
        });

        test('timeline renders year markers', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            // Check for specific years using the year class and filtering out wrappers
            const years = ['2009', '2021', '2025'];

            for (const year of years) {
                // Use a more specific selector strategy to avoid matching the wrapper
                // The year marker is a div containing just the year number
                const yearMarker = page.locator('[class*="timeline"] div').filter({
                    hasText: new RegExp(`^${year}$`)
                });
                await expect(yearMarker.first()).toBeVisible();
            }
        });
    });

    test.describe('Timeline Job Styling', () => {
        test('regular jobs have background color', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            // Find a regular job (not isBreak) - use EPAM by text
            const epamJob = page.locator('[class*="job"]:not([class*="Wrapper"]):not([class*="Row"])').filter({ hasText: 'EPAM' });
            await expect(epamJob.first()).toBeVisible();

            // Check it has the expected background color
            const bgColor = await epamJob.first().evaluate(el =>
                window.getComputedStyle(el).backgroundColor
            );

            // Should have some color (not fully transparent)
            expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
        });

        test('break jobs have different background color than regular jobs', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            // Regular job: use EPAM
            const regularJob = page.locator('[class*="job"]:not([class*="Wrapper"]):not([class*="Row"])').filter({ hasText: 'EPAM' });
            // Break job: use Sabbatical
            const breakJob = page.locator('[class*="isBreak"]').first();

            await expect(regularJob.first()).toBeVisible();
            await expect(breakJob).toBeVisible();

            const regularBg = await regularJob.first().evaluate(el =>
                window.getComputedStyle(el).backgroundColor
            );
            const breakBg = await breakJob.evaluate(el =>
                window.getComputedStyle(el).backgroundColor
            );

            // They should have different colors
            expect(regularBg).not.toBe(breakBg);
        });

        test('jobs show skills on hover (title attribute)', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            // Find job with text EPAM and check its title
            const epamJob = page.locator('[class*="job"]:not([class*="Wrapper"]):not([class*="Row"])').filter({ hasText: 'EPAM' });
            const title = await epamJob.first().getAttribute('title');

            expect(title).toContain('Team leading');
        });
    });

    test.describe('Timeline Job Click Navigation', () => {
        test('clicking on job with id scrolls to job description', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            // Click on EPAM job text to avoid pseudo-element or layout interception
            // Force click if necessary as skewed/masked elements might be technically "intercepted"
            const epamJob = page.locator('[class*="job"] [class*="jobText"]').filter({ hasText: 'EPAM' });

            // Ensure visible first to avoid Playwright scrolling during click
            await epamJob.first().scrollIntoViewIfNeeded();
            await page.waitForTimeout(500);

            // Get initial scroll position
            const initialScrollY = await page.evaluate(() => window.scrollY);

            await epamJob.first().click({ force: true });

            // Wait for smooth scroll
            await page.waitForTimeout(1000);

            // Should have scrolled
            const newScrollY = await page.evaluate(() => window.scrollY);
            expect(newScrollY).not.toBe(initialScrollY);
        });

        test('clicking on Sabbatical (no id) does not cause scroll', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            // Target Sabbatical
            const sabbatical = page.locator('[class*="isBreak"]').filter({ hasText: 'Sabbatical' }).first();

            // Ensure it is in view first to avoid auto-scroll during click
            await sabbatical.scrollIntoViewIfNeeded();
            await page.waitForTimeout(500); // Settle

            const initialScrollY = await page.evaluate(() => window.scrollY);

            // Click on Sabbatical
            await sabbatical.click({ force: true });

            await page.waitForTimeout(500);

            // Should be at same position
            const newScrollY = await page.evaluate(() => window.scrollY);
            // Allow small tolerance for any micro-movements
            expect(Math.abs(newScrollY - initialScrollY)).toBeLessThan(10);
        });
    });

    test.describe('Timeline Responsive Layout', () => {
        test('timeline adjusts layout on mobile viewport', async ({ page }) => {
            // Set mobile viewport
            await page.setViewportSize({ width: 375, height: 667 });
            await page.goto('/cv');

            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            // Timeline should still be visible via job rows
            const jobRows = page.locator('[class*="jobRow"]');
            await expect(jobRows.first()).toBeVisible();
            const count = await jobRows.count();
            expect(count).toBeGreaterThan(0);
        });

        test('timeline shows more rows on narrow viewport', async ({ page }) => {
            // Start with wide viewport
            await page.setViewportSize({ width: 1400, height: 800 });
            await page.goto('/cv');

            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            const jobRows = page.locator('[class*="jobRow"]');
            await expect(jobRows.first()).toBeVisible();
            const wideRows = await jobRows.count();

            // Switch to narrow viewport
            await page.setViewportSize({ width: 600, height: 800 });
            await page.waitForTimeout(300); // Wait for resize handler

            const narrowRows = await page.locator('[class*="jobRow"]').count();

            // Narrow viewport may have same or more rows (more year splits)
            expect(narrowRows).toBeGreaterThanOrEqual(wideRows);
        });
    });

    test.describe('Job Descriptions Content', () => {
        test('EPAM job description is present', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            // Check for EPAM content from MDX
            const epamHeading = page.locator('#epam, [id="epam"]');
            await expect(epamHeading).toBeAttached();
        });

        test('Holmusk job description is present', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            const holmuskHeading = page.locator('#holmusk, [id="holmusk"]');
            await expect(holmuskHeading).toBeAttached();
        });

        test('job descriptions have company links', async ({ page }) => {
            const experienceSection = page.locator('#experience');
            await experienceSection.scrollIntoViewIfNeeded();

            // Job descriptions should have links to company websites
            const companyLinks = experienceSection.locator('a[href*="http"], a[href*="www"]');
            const count = await companyLinks.count();

            expect(count).toBeGreaterThan(0);
        });
    });
});

test.describe('Timeline Visual Regression', () => {
    test('experience section screenshot', async ({ page }) => {
        await page.goto('/cv');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(1000);

        const experienceSection = page.locator('#experience');
        await experienceSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        // Screenshot the entire experience section which contains the timeline
        await expect(experienceSection).toHaveScreenshot('experience-section.png', {
            maxDiffPixelRatio: 0.1,
        });
    });
});
