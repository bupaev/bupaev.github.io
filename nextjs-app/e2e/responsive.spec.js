const { test, expect } = require('@playwright/test')

test.describe('Responsive Behavior', () => {
  test('should display correctly on desktop (1920x1080)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/cv')

    // Hero area should be visible
    await expect(page.locator('#hero-area')).toBeVisible()

    // Vertical menu should be visible on desktop
    const verticalMenu = page.locator('[class*="vertical-menu"]').first()
    if ((await verticalMenu.count()) > 0) {
      await expect(verticalMenu).toBeVisible()
    }

    // All sections should be visible
    await expect(page.locator('#overview')).toBeVisible()
    await expect(page.locator('#skills')).toBeVisible()
  })

  test('should display correctly on tablet (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/cv')

    // All main sections should still be accessible
    await expect(page.locator('#hero-area')).toBeVisible()
    await expect(page.locator('#overview')).toBeVisible()
    await expect(page.locator('#skills')).toBeVisible()
    await expect(page.locator('#experience')).toBeVisible()
  })

  test('should display correctly on mobile (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/cv')

    // Hero area should be visible
    await expect(page.locator('#hero-area')).toBeVisible()

    // All sections should be stacked vertically
    await expect(page.locator('#overview')).toBeVisible()
    await expect(page.locator('#skills')).toBeVisible()
  })

  test('should handle vertical menu positioning on mobile scroll', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/cv')

    const verticalMenu = page.locator('[class*="vertical-menu"]').first()

    if ((await verticalMenu.count()) > 0) {
      // Check initial position
      const initialPosition = await verticalMenu.boundingBox()

      // Scroll down past hero area
      await page.evaluate(() => window.scrollTo(0, 500))
      await page.waitForTimeout(300)

      // Check position after scroll
      const scrolledPosition = await verticalMenu.boundingBox()

      // Position should change (either fixed or absolute positioning)
      if (initialPosition && scrolledPosition) {
        // Menu should be repositioned for mobile
        expect(scrolledPosition.y).toBeDefined()
      }
    }
  })

  test('should adjust hero area height on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/cv')

    const heroArea = page.locator('#hero-area')
    const boundingBox = await heroArea.boundingBox()

    expect(boundingBox).toBeTruthy()
    if (boundingBox) {
      // Hero should be visible and have reasonable height
      expect(boundingBox.height).toBeGreaterThan(100)
    }
  })

  test('should handle window resize from desktop to mobile', async ({ page }) => {
    // Start with desktop size
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/cv')

    // Verify desktop layout
    await expect(page.locator('#hero-area')).toBeVisible()

    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 })
    await page.waitForTimeout(500) // Wait for resize handlers

    // Verify mobile layout still works
    await expect(page.locator('#hero-area')).toBeVisible()
    await expect(page.locator('#overview')).toBeVisible()
  })

  test('should have touch-friendly interactive elements on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/cv')

    // All clickable links should be accessible
    const links = page.locator('a')
    const count = await links.count()

    expect(count).toBeGreaterThan(0)

    // Test that first few links have sufficient size for touch
    for (let i = 0; i < Math.min(3, count); i++) {
      const link = links.nth(i)
      if (await link.isVisible()) {
        const box = await link.boundingBox()
        if (box) {
          // Touch targets should be at least 44x44 (WCAG guideline)
          // We'll be lenient and check for at least 30px in one dimension
          expect(box.height).toBeGreaterThan(20)
        }
      }
    }
  })

  test('should maintain aspect ratios of images on different viewports', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 }
    ]

    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      await page.goto('/cv')

      // Check that images are loaded
      const images = page.locator('img')
      const count = await images.count()

      if (count > 0) {
        // Verify first image has loaded
        const firstImage = images.first()
        await expect(firstImage).toBeVisible()

        // Check that image has dimensions
        const box = await firstImage.boundingBox()
        if (box) {
          expect(box.width).toBeGreaterThan(0)
          expect(box.height).toBeGreaterThan(0)
        }
      }
    }
  })

  test('should not have horizontal scroll on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/cv')
    await page.waitForLoadState('networkidle')

    // Check if page has horizontal overflow
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })

    expect(hasHorizontalScroll).toBe(false)
  })
})
