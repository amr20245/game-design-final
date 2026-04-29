import { test, expect } from '@playwright/test';

test('enters a guess in Wordle and sees it rendered', async ({ page }) => {
  await page.goto('/wordle');
  await expect(page.getByText('Wordle')).toBeVisible();
  const input = page.getByPlaceholder('Enter a 5-letter word');
  await input.fill('audio');
  await page.getByRole('button', { name: 'Guess' }).click();
  // After guessing, the guess should appear on the board
  await expect(page.getByText(/a u d i o/i)).toBeVisible();
});