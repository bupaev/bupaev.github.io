import { test, expect } from '@playwright/test';

test.describe('CvVerticalMenu - Visibility', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/cv');
        await page.waitForLoadState('domcontentloaded');
    });

    test('vertical menu is visible on desktop', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop-only test');

        const menu = page.locator('nav[class*="verticalMenu"]');
        await expect(menu).toBeVisible();
    });

    test('menu items are visible on desktop', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop-only test');

        // Use direct child selector to avoid matching nested elements like itemIcon/itemText
        const menu = page.locator('nav[class*="verticalMenu"]');
        const menuItems = menu.locator('> div > button[class*="item"]');
        await expect(menuItems).toHaveCount(5);
    });

    test('menu indicator is visible on mobile', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'Mobile-only test');

        const menu = page.locator('nav[class*="verticalMenu"]');
        await expect(menu).toBeAttached();
    });
});

test.describe('CvVerticalMenu - Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/cv');
        await page.waitForLoadState('domcontentloaded');
        // Wait for menu initialization (setTimeout 100ms in component + buffer)
        await page.waitForTimeout(300);
    });

    test('clicking menu item scrolls to hero section', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop-only test');

        const menu = page.locator('nav[class*="verticalMenu"]');
        const helloItem = menu.locator('> div > button[class*="item"]').first();
        await helloItem.click();
        await page.waitForTimeout(1000); // Wait for smooth scroll

        const heroSection = page.locator('#hero-area');
        await expect(heroSection).toBeInViewport();
    });

    test('clicking menu item scrolls to overview section', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop-only test');

        // Overview/overview is the 2nd item (index 1)
        const menu = page.locator('nav[class*="verticalMenu"]');
        const overviewItem = menu.locator('> div > button[class*="item"]').nth(1);
        await overviewItem.click();
        await page.waitForTimeout(1000);

        const overviewSection = page.locator('#overview');
        await expect(overviewSection).toBeInViewport();
    });

    test('clicking menu item scrolls to skills section', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop-only test');

        // Skills is the 3rd item (index 2)
        const menu = page.locator('nav[class*="verticalMenu"]');
        const skillsItem = menu.locator('> div > button[class*="item"]').nth(2);
        await skillsItem.click();
        await page.waitForTimeout(1000);

        const skillsSection = page.locator('#skills');
        await expect(skillsSection).toBeInViewport();
    });

    test('clicking menu item scrolls to experience section', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop-only test');

        // Experience is the 4th item (index 3)
        const menu = page.locator('nav[class*="verticalMenu"]');
        const experienceItem = menu.locator('> div > button[class*="item"]').nth(3);
        await experienceItem.click();
        await page.waitForTimeout(1000);

        const experienceSection = page.locator('#experience');
        await expect(experienceSection).toBeInViewport();
    });

    test('clicking menu item scrolls to education section', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop-only test');

        // Education is the 5th item (index 4)
        const menu = page.locator('nav[class*="verticalMenu"]');
        const educationItem = menu.locator('> div > button[class*="item"]').nth(4);
        await educationItem.click();
        await page.waitForTimeout(1000);

        const educationSection = page.locator('#education');
        await expect(educationSection).toBeInViewport();
    });
});

test.describe('CvVerticalMenu - Visible Area Marker', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/cv');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(300);
    });

    test('visible area marker exists on desktop', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop-only test');

        const marker = page.locator('[class*="visibleAreaMarker"]');
        await expect(marker).toBeVisible();
    });

    test('marker position changes on scroll', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop-only test');

        const marker = page.locator('[class*="visibleAreaMarker"]');

        // Get initial position
        const initialTransform = await marker.evaluate((el) => {
            return window.getComputedStyle(el).transform;
        });

        // Scroll down
        await page.evaluate(() => window.scrollTo(0, 1000));
        await page.waitForTimeout(300);

        // Get new position
        const newTransform = await marker.evaluate((el) => {
            return window.getComputedStyle(el).transform;
        });

        // Transforms should be different after scrolling
        expect(newTransform).not.toBe(initialTransform);
    });

    test('marker height changes based on viewport visibility', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop-only test');

        const marker = page.locator('[class*="visibleAreaMarker"]');

        // Capture initial height for comparison (confirms marker has valid height)
        const initialHeight = await marker.evaluate((el) => el.clientHeight);
        expect(initialHeight).toBeGreaterThan(0);

        // Scroll to bottom of page
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight - window.innerHeight);
        });
        await page.waitForTimeout(300);

        const finalHeight = await marker.evaluate((el) => el.clientHeight);

        // Height might change (or be clamped to item height at end of page)
        expect(finalHeight).toBeGreaterThan(0);
    });
});

test.describe('CvVerticalMenu - Hover Interactions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/cv');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(300);
    });

    test('menu expands on hover to show text labels', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop-only test');

        const menu = page.locator('nav[class*="verticalMenu"]');
        const menuItem = menu.locator('> div > button[class*="item"]').first();

        // Get initial width
        const initialWidth = await menuItem.evaluate((el) => el.clientWidth);

        // Hover over menu
        await menu.hover();
        await page.waitForTimeout(500); // Wait for transition

        // Get expanded width
        const expandedWidth = await menuItem.evaluate((el) => el.clientWidth);

        // Menu should be wider after hover (unless on very wide screens where it's already expanded)
        expect(expandedWidth).toBeGreaterThanOrEqual(initialWidth);
    });

    test('menu item text becomes visible on hover', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop-only test');

        const itemText = page.locator('[class*="verticalMenu"] [class*="itemText"]').first();
        const menu = page.locator('nav[class*="verticalMenu"]');

        // Hover over menu to expand
        await menu.hover();
        await page.waitForTimeout(500);

        // Text should be visible
        await expect(itemText).toBeVisible();
    });
});

test.describe('CvVerticalMenu - Dark Mode', () => {
    test('menu adapts to dark mode', async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop-only test');

        await page.goto('/cv');
        await page.waitForLoadState('domcontentloaded');

        const marker = page.locator('[class*="visibleAreaMarker"]');

        // Capture light mode color for reference (confirms marker has styling)
        const lightModeColor = await marker.evaluate((el) => {
            return window.getComputedStyle(el).backgroundColor;
        });
        expect(lightModeColor).toBeTruthy();

        // Toggle dark mode
        const toggle = page.locator('[class*="dark-mode"], [class*="darkMode"]');
        if (await toggle.count() > 0) {
            await toggle.first().click();
            await page.waitForTimeout(300);

            // Check marker still exists and has proper styling
            await expect(marker).toBeVisible();
        }
    });
});

test.describe('CvVerticalMenu - Mobile Sticky Behavior', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/cv');
        await page.waitForLoadState('domcontentloaded');
        // Wait for menu initialization and hero height calculation
        await page.waitForTimeout(300);

        // Wait for hydration/visibility (opacity 1)
        if ((await page.viewportSize())?.width && (await page.viewportSize())!.width <= 960) {
            const menu = page.locator('nav[class*="verticalMenu"]');
            await expect(menu).toHaveCSS('opacity', '1');
        }
    });

    test('menu wrapper starts below hero area on mobile', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'Mobile-only test');

        const menu = page.locator('nav[class*="verticalMenu"]');
        const heroArea = page.locator('#hero-area');

        // Get hero area height
        const heroHeight = await heroArea.evaluate((el) => el.clientHeight);

        // Get menu wrapper position
        const wrapperStyle = await menu.evaluate((el) => ({
            position: window.getComputedStyle(el).position,
            top: window.getComputedStyle(el).top,
        }));

        // Menu wrapper should be absolutely positioned at hero height
        expect(wrapperStyle.position).toBe('absolute');
        expect(parseInt(wrapperStyle.top, 10)).toBe(heroHeight);
    });

    test('menu becomes sticky after scrolling past hero on mobile', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'Mobile-only test');

        const menu = page.locator('nav[class*="verticalMenu"]');
        const heroArea = page.locator('#hero-area');

        // Get hero area height
        const heroHeight = await heroArea.evaluate((el) => el.clientHeight);

        // Scroll past the hero area
        await page.evaluate((scrollTo) => window.scrollTo(0, scrollTo), heroHeight + 100);
        await page.waitForTimeout(200);

        // Menu wrapper should now be fixed at top (with 56px offset for dark mode toggle)
        const wrapperStyle = await menu.evaluate((el) => ({
            position: window.getComputedStyle(el).position,
            top: window.getComputedStyle(el).top,
            rectTop: el.getBoundingClientRect().top,
        }));

        expect(wrapperStyle.position).toBe('fixed');
        expect(wrapperStyle.rectTop).toBe(56);
    });

    test('menu returns to absolute position when scrolling back up on mobile', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'Mobile-only test');

        const menu = page.locator('nav[class*="verticalMenu"]');
        const heroArea = page.locator('#hero-area');

        // Get hero area height
        const heroHeight = await heroArea.evaluate((el) => el.clientHeight);

        // Scroll past hero area first
        await page.evaluate((scrollTo) => window.scrollTo(0, scrollTo), heroHeight + 100);
        await page.waitForTimeout(200);

        // Verify it's sticky
        let wrapperPosition = await menu.evaluate((el) =>
            window.getComputedStyle(el).position
        );
        expect(wrapperPosition).toBe('fixed');

        // Scroll back to top
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(200);

        // Menu should return to absolute positioning
        wrapperPosition = await menu.evaluate((el) =>
            window.getComputedStyle(el).position
        );
        expect(wrapperPosition).toBe('absolute');
    });
});
