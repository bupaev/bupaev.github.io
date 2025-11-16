const { test, expect } = require('@playwright/test')

test.describe('Homepage', () => {
  test('should redirect from index to /cv page', async ({ page }) => {
    await page.goto('/')

    // Wait for redirect to complete
    await page.waitForURL('**/cv')

    // Verify we're on the CV page
    expect(page.url()).toContain('/cv')
  })

  test('should have correct page title', async ({ page }) => {
    await page.goto('/cv')

    // Check page title
    await expect(page).toHaveTitle(/Pavel Buramensky/)
  })

  test('should have correct meta description', async ({ page }) => {
    await page.goto('/cv')

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute(
      'content',
      /Creative front-end developer/
    )
  })

  test('should have Open Graph meta tags', async ({ page }) => {
    await page.goto('/cv')

    // Check OG tags
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', /.+/)

    const ogImage = page.locator('meta[property="og:image"]')
    await expect(ogImage).toHaveAttribute('content', /.*\.jpg/)
  })
})
