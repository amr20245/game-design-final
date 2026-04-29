import { test, expect } from '@playwright/test';

test('starts a local Tic Tac Toe game and makes a move', async ({ page }) => {
  await page.goto('/tictactoe');
  await expect(page.getByText('Tic Tac Toe')).toBeVisible();
  // Wait for board to load
  const cells = page.locator('button');
  // Click the first cell
  await cells.nth(0).click();
  // The first cell should now contain either X or O
  await expect(cells.nth(0)).not.toHaveText('');
});