const { test, expect } = require('@playwright/test')

test.describe('Basic navigation', () => {
  test('homepage redirects to /cv', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('/cv')
  })

  test('CV page loads successfully', async ({ page }) => {
    await page.goto('/cv')
    await expect(page).toHaveTitle(/Pavel Buramensky/)
    await expect(page.locator('h1')).toContainText('Pavel Buramensky')
  })

  test('footer is visible', async ({ page }) => {
    await page.goto('/cv')
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('dark mode toggle is visible on desktop', async ({ page }) => {
    await page.goto('/cv')
    const darkModeToggle = page.locator('.dark-mode-toggle')
    await expect(darkModeToggle).toBeVisible()
  })
})
