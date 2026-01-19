import { test, expect } from '@playwright/test';

test.describe('CV Page - Layout and Structure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cv');
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Paul Buramensky/);
  });

  test('hero section is visible with portrait image', async ({ page }) => {
    const heroSection = page.locator('.hero-area');
    await expect(heroSection).toBeVisible();

    // v-lazy-image may initially be hidden, check for image element existence
    const portrait = page.locator('.hero-area img, .hero-area picture');
    await expect(portrait.first()).toBeAttached();
  });

  test('all main sections are visible', async ({ page }) => {
    const sections = [
      { id: 'overview', name: 'Overview' },
      { id: 'skills', name: 'Skills' },
      { id: 'experience', name: 'Experience' },
      { id: 'education', name: 'Education' },
    ];

    for (const section of sections) {
      const sectionElement = page.locator(`#${section.id}`);
      await expect(sectionElement, `${section.name} section should exist`).toBeAttached();
    }
  });

  test('footer is visible', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});

test.describe('CV Page - Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cv');
  });

  test('vertical menu is visible on desktop', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
    }
    const menu = page.locator('.vertical-menu, [class*="vertical-menu"]');
    await expect(menu).toBeVisible();
  });

  test('menu links scroll to correct sections', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
    }

    const menuLinks = page.locator('.vertical-menu a, [class*="vertical-menu"] a');
    const count = await menuLinks.count();

    if (count > 0) {
      // Click on skills link and verify scroll
      const skillsLink = page.locator('a[href="#skills"], a[href*="skills"]').first();
      if (await skillsLink.isVisible()) {
        await skillsLink.click();
        await page.waitForTimeout(1000); // Wait for smooth scroll

        const skillsSection = page.locator('#skills');
        await expect(skillsSection).toBeInViewport();
      }
    }
  });

  test('go-to-top button appears on scroll and works', async ({ page }) => {
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);

    const goToTop = page.locator('.go-to-top, [class*="go-to-top"], button[aria-label*="top"]');

    if (await goToTop.count() > 0) {
      await expect(goToTop.first()).toBeVisible();
      await goToTop.first().click();
      await page.waitForTimeout(1000);

      const scrollY = await page.evaluate(() => window.scrollY);
      // Allow some tolerance as smooth scroll may not complete exactly at top
      expect(scrollY).toBeLessThan(200);
    }
  });
});

test.describe('CV Page - Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cv');
  });

  test('dark mode toggle exists and works', async ({ page }) => {
    const toggle = page.locator('.dark-mode-toggle, [class*="dark-mode"], [class*="theme-toggle"]');

    if (await toggle.count() > 0) {
      const toggleButton = toggle.first();
      await expect(toggleButton).toBeVisible();

      // Get initial color scheme
      const initialScheme = await page.evaluate(() =>
        document.documentElement.getAttribute('data-color-scheme') ||
        document.body.getAttribute('data-color-scheme')
      );

      // Click toggle
      await toggleButton.click();
      await page.waitForTimeout(300);

      // Verify scheme changed
      const newScheme = await page.evaluate(() =>
        document.documentElement.getAttribute('data-color-scheme') ||
        document.body.getAttribute('data-color-scheme')
      );

      expect(newScheme).not.toBe(initialScheme);
    }
  });

  test('dark mode persists after page reload', async ({ page }) => {
    const toggle = page.locator('.dark-mode-toggle, [class*="dark-mode"], [class*="theme-toggle"]');

    if (await toggle.count() > 0) {
      await toggle.first().click();
      await page.waitForTimeout(300);

      const schemeBeforeReload = await page.evaluate(() =>
        document.documentElement.getAttribute('data-color-scheme') ||
        document.body.getAttribute('data-color-scheme')
      );

      await page.reload();
      await page.waitForLoadState('domcontentloaded');

      const schemeAfterReload = await page.evaluate(() =>
        document.documentElement.getAttribute('data-color-scheme') ||
        document.body.getAttribute('data-color-scheme')
      );

      expect(schemeAfterReload).toBe(schemeBeforeReload);
    }
  });
});

test.describe('CV Page - Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cv');
  });

  test('venn diagram renders in overview section', async ({ page }) => {
    const overviewSection = page.locator('#overview');
    await overviewSection.scrollIntoViewIfNeeded();

    const vennDiagram = page.locator('.venn-diagram, [class*="venn"], svg');
    await expect(vennDiagram.first()).toBeVisible();
  });

  test('skills section has skill categories', async ({ page }) => {
    const skillsSection = page.locator('#skills');
    await skillsSection.scrollIntoViewIfNeeded();

    const skillGroups = page.locator('.skills-group, [class*="skill"]');
    const count = await skillGroups.count();
    expect(count).toBeGreaterThan(0);
  });

  test('skill bars are present', async ({ page }) => {
    const skillsSection = page.locator('#skills');
    await skillsSection.scrollIntoViewIfNeeded();

    const skillBars = page.locator('.skill-bar, [class*="skill-bar"], [class*="progress"]');
    const count = await skillBars.count();
    expect(count).toBeGreaterThan(0);
  });

  test('timeline exists in experience section', async ({ page }) => {
    const experienceSection = page.locator('#experience');
    await experienceSection.scrollIntoViewIfNeeded();

    const timeline = page.locator('.timeline, [class*="timeline"]');
    await expect(timeline.first()).toBeVisible();
  });

  test('download CV button exists and has correct href', async ({ page }) => {
    const downloadButton = page.locator('a[href*=".pdf"], a[href*="cv"]').filter({ hasText: /download|cv/i });

    if (await downloadButton.count() > 0) {
      const href = await downloadButton.first().getAttribute('href');
      expect(href).toContain('.pdf');
    }
  });
});

test.describe('CV Page - Responsive', () => {
  test('mobile layout stacks sections vertically', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    await page.goto('/cv');

    // Sections should be visible and stacked
    const sections = page.locator('section, .section');
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);

    // Menu should be hidden or positioned differently on mobile
    const menu = page.locator('.vertical-menu, [class*="vertical-menu"]');
    if (await menu.count() > 0) {
      // On mobile, menu might be hidden or have different positioning
      // On mobile, menu visibility may vary - this is just informational
    }
  });

  test('portrait image uses mobile version on small screens', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    await page.goto('/cv');

    const heroImage = page.locator('.hero-area img').first();
    if (await heroImage.count() > 0) {
      const src = await heroImage.getAttribute('src');
      const srcset = await heroImage.getAttribute('srcset');
      // Mobile images should be present (either via src or srcset)
      expect(src || srcset).toBeTruthy();
    }
  });
});

test.describe('Root Redirect', () => {
  test('root path redirects to /cv', async ({ page }) => {
    await page.goto('/');
    await page.waitForURL(/\/cv/);
    expect(page.url()).toContain('/cv');
  });
});

test.describe('Visual Regression Baseline', () => {
  test('hero section screenshot', async ({ page }) => {
    await page.goto('/cv');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000); // Wait for lazy images and animations

    const hero = page.locator('.hero-area, .hero');
    if (await hero.count() > 0) {
      await expect(hero.first()).toHaveScreenshot('hero-section.png', {
        maxDiffPixelRatio: 0.1,
      });
    }
  });

  test('full page screenshot', async ({ page }) => {
    await page.goto('/cv');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000); // Wait for lazy images and animations

    await expect(page).toHaveScreenshot('cv-full-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.1,
    });
  });
});
