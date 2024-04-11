import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const title = await page.title();
  expect(title).toBe('MainStack Admin');
});
