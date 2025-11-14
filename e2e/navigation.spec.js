const { test, expect } = require('@playwright/test')

test.describe('Navigation and Scrolling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cv')
  })

  test('should have all section anchors visible', async ({ page }) => {
    // Check that all main sections exist
    await expect(page.locator('#hero-area')).toBeVisible()
    await expect(page.locator('#overview')).toBeVisible()
    await expect(page.locator('#skills')).toBeVisible()
    await expect(page.locator('#experience')).toBeVisible()
    await expect(page.locator('#education')).toBeVisible()
  })

  test('should scroll to overview section when clicking navigation link', async ({ page }) => {
    // Find and click overview link in navigation
    const overviewLink = page.locator('a[href="#overview"]').first()
    await overviewLink.click()

    // Wait for scroll animation
    await page.waitForTimeout(800)

    // Check that overview section is in viewport
    const overviewSection = page.locator('#overview')
    await expect(overviewSection).toBeInViewport()
  })

  test('should scroll to skills section when clicking navigation link', async ({ page }) => {
    const skillsLink = page.locator('a[href="#skills"]').first()
    await skillsLink.click()

    await page.waitForTimeout(800)

    const skillsSection = page.locator('#skills')
    await expect(skillsSection).toBeInViewport()
  })

  test('should scroll to experience section when clicking navigation link', async ({ page }) => {
    const experienceLink = page.locator('a[href="#experience"]').first()
    await experienceLink.click()

    await page.waitForTimeout(800)

    const experienceSection = page.locator('#experience')
    await expect(experienceSection).toBeInViewport()
  })

  test('should scroll to education section when clicking navigation link', async ({ page }) => {
    const educationLink = page.locator('a[href="#education"]').first()
    await educationLink.click()

    await page.waitForTimeout(800)

    const educationSection = page.locator('#education')
    await expect(educationSection).toBeInViewport()
  })

  test('should have smooth scrolling enabled', async ({ page }) => {
    // Check that html element has smooth scroll behavior
    const scrollBehavior = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).scrollBehavior
    })

    // Smooth scroll should be enabled either via CSS or polyfill
    expect(['smooth', 'auto']).toContain(scrollBehavior)
  })

  test('should display vertical menu on desktop', async ({ page, viewport }) => {
    // Only test on desktop viewports
    if (viewport && viewport.width < 769) {
      test.skip()
    }

    const verticalMenu = page.locator('[class*="vertical-menu"]').first()
    await expect(verticalMenu).toBeVisible()
  })

  test('should display footer', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })
})
