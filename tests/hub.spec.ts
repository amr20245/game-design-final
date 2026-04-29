import { test, expect } from '@playwright/test';

test.describe('Hub page', () => {
  test('allows entering a player name and shows it in the banner', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Welcome to GameHub!')).toBeVisible();
    const input = page.getByPlaceholder('Player name');
    await input.fill('Alice');
    await page.getByRole('button', { name: 'Save' }).click();
    // The player banner should display the saved name
    await expect(page.getByText('Player: Alice')).toBeVisible();
  });

  test('shows four game cards with play buttons', async ({ page }) => {
    await page.goto('/');
    const cards = await page.locator('.card');
    await expect(cards).toHaveCount(4);
    await expect(cards.first().getByRole('link', { name: 'Play' })).toBeVisible();
  });
});