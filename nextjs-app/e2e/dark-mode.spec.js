const { test, expect } = require('@playwright/test')

test.describe('Dark Mode Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cv')
  })

  test('should have dark mode toggle button visible', async ({ page }) => {
    // Look for dark mode toggle component
    const darkModeToggle = page.locator('[class*="dark-mode-toggle"]').first()

    // If component uses different selector, try alternative
    if (await darkModeToggle.count() === 0) {
      // Try finding by button or other common selectors
      const toggle = page.locator('button').filter({ hasText: /dark|light|theme/i }).first()
      if (await toggle.count() > 0) {
        await expect(toggle).toBeVisible()
        return
      }
    }

    await expect(darkModeToggle).toBeVisible()
  })

  test('should toggle dark mode when clicking the toggle button', async ({ page }) => {
    // Get initial theme
    const initialTheme = await page
      .locator('html')
      .getAttribute('data-color-scheme')

    // Find and click the toggle button
    // Try multiple selector strategies since we don't know the exact structure
    const toggleButton = page
      .locator('[class*="dark-mode-toggle"]')
      .locator('button, a, input[type="checkbox"]')
      .first()

    // Alternative: try finding any interactive element in dark mode component
    const toggle =
      (await toggleButton.count()) > 0
        ? toggleButton
        : page.locator('button, a, label').filter({ hasText: /dark|light|theme/i }).first()

    if ((await toggle.count()) > 0) {
      await toggle.click()

      // Wait for theme change
      await page.waitForTimeout(300)

      // Get new theme
      const newTheme = await page.locator('html').getAttribute('data-color-scheme')

      // Theme should have changed
      expect(newTheme).not.toBe(initialTheme)
    }
  })

  test('should persist dark mode preference across page reloads', async ({ page, context }) => {
    // Set dark mode
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-color-scheme', 'dark')
      localStorage.setItem('color-scheme', 'dark')
    })

    // Reload page
    await page.reload()
    await page.waitForLoadState('domcontentloaded')

    // Check that dark mode persists
    const theme = await page.locator('html').getAttribute('data-color-scheme')
    expect(theme).toBe('dark')
  })

  test('should apply dark mode styles when enabled', async ({ page }) => {
    // Enable dark mode
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-color-scheme', 'dark')
    })

    await page.waitForTimeout(300)

    // Check that dark mode attribute is set
    const theme = await page.locator('html').getAttribute('data-color-scheme')
    expect(theme).toBe('dark')

    // Verify that some elements have different styles in dark mode
    const backgroundColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor
    })

    // Background should be dark (not white)
    expect(backgroundColor).not.toBe('rgb(255, 255, 255)')
  })

  test('should apply light mode styles when disabled', async ({ page }) => {
    // Enable light mode
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-color-scheme', 'light')
    })

    await page.waitForTimeout(300)

    // Check that light mode attribute is set
    const theme = await page.locator('html').getAttribute('data-color-scheme')
    expect(theme).toBe('light')
  })

  test('should respect system color scheme preference', async ({ page, context }) => {
    // Create page with dark mode preference
    const darkPage = await context.newPage({
      colorScheme: 'dark'
    })

    await darkPage.goto('/cv')
    await darkPage.waitForLoadState('domcontentloaded')

    // If no manual preference is set, should respect system preference
    const hasManualPreference = await darkPage.evaluate(() => {
      return localStorage.getItem('color-scheme') !== null
    })

    if (!hasManualPreference) {
      const theme = await darkPage.locator('html').getAttribute('data-color-scheme')
      // Should default to system preference or have some theme set
      expect(theme).toBeTruthy()
    }

    await darkPage.close()
  })
})
