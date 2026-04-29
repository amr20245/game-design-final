import { test, expect } from '@playwright/test';

test('plays a round of rock paper scissors', async ({ page }) => {
  await page.goto('/rock-paper-scissors');
  await expect(page.getByText('Rock Paper Scissors')).toBeVisible();
  // Click the rock button
  await page.getByRole('button', { name: 'Rock' }).click();
  // After playing, a result paragraph should appear
  await expect(page.locator('p').nth(1)).toContainText('You');
  // Scoreboard should update
  await expect(page.getByText(/Wins:/)).toBeVisible();
});