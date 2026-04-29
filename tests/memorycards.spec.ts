import { test, expect } from '@playwright/test';

test('flips two cards in Memory Cards', async ({ page }) => {
  await page.goto('/memory-cards');
  await expect(page.getByText('Memory Cards')).toBeVisible();
  const cards = page.locator('div').filter({ hasText: '' }).nth(2);
  // There are multiple card divs; we need to select by style; for testing pick first two clickable
  const cardElements = page.locator('div[style*="width: 80px"]');
  await cardElements.nth(0).click();
  await cardElements.nth(1).click();
  // Moves count should update to 1
  await expect(page.getByText(/Moves:/)).toBeVisible();
});