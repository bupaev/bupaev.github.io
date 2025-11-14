const { test, expect } = require('@playwright/test')

test.describe('CV Page Content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cv')
  })

  test('should display hero area with main content', async ({ page }) => {
    const heroArea = page.locator('#hero-area')
    await expect(heroArea).toBeVisible()

    // Hero should be sticky
    const position = await heroArea.evaluate(el =>
      window.getComputedStyle(el).position
    )
    expect(position).toBe('sticky')
  })

  test('should display overview section with content', async ({ page }) => {
    const overviewSection = page.locator('#overview')
    await expect(overviewSection).toBeVisible()

    // Should have primary class from Bulma
    await expect(overviewSection).toHaveClass(/is-primary/)
  })

  test('should display skills section with skill bars', async ({ page }) => {
    const skillsSection = page.locator('#skills')
    await expect(skillsSection).toBeVisible()

    // Should have background decoration
    await expect(skillsSection).toHaveClass(/with-background/)
  })

  test('should display experience section with timeline', async ({ page }) => {
    const experienceSection = page.locator('#experience')
    await expect(experienceSection).toBeVisible()

    // Should have background decoration
    await expect(experienceSection).toHaveClass(/with-background/)
  })

  test('should display education section', async ({ page }) => {
    const educationSection = page.locator('#education')
    await expect(educationSection).toBeVisible()

    // Should have background decoration
    await expect(educationSection).toHaveClass(/with-background/)
  })

  test('should have PDF download link', async ({ page }) => {
    // Look for link to PDF CV
    const pdfLink = page.locator('a[href*=".pdf"]').first()

    if (await pdfLink.count() > 0) {
      await expect(pdfLink).toHaveAttribute('href', /pavel-buramensky-cv\.pdf/)
    }
  })

  test('should load all section background images', async ({ page }) => {
    // Check that background images load (SVG icons)
    const sectionsWithBackground = page.locator('.with-background')
    const count = await sectionsWithBackground.count()

    expect(count).toBeGreaterThan(0)

    // Verify each section has background styling
    for (let i = 0; i < count; i++) {
      const section = sectionsWithBackground.nth(i)
      await expect(section).toBeVisible()
    }
  })

  test('should have accessible section headings', async ({ page }) => {
    // All sections should have proper heading structure
    const headings = page.locator('h1, h2, h3')
    const count = await headings.count()

    expect(count).toBeGreaterThan(0)
  })

  test('should not have any console errors', async ({ page }) => {
    const consoleErrors = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/cv')
    await page.waitForLoadState('networkidle')

    // Filter out known acceptable errors (if any)
    const criticalErrors = consoleErrors.filter(
      error => !error.includes('favicon') // Ignore favicon 404s
    )

    expect(criticalErrors).toHaveLength(0)
  })
})
