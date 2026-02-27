import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const authDir = path.resolve(__dirname, '..', 'auth');
const authFile = path.resolve(authDir, 'lawyer.json');

setup('authenticate as lawyer', async ({ page }) => {
  const email = process.env.E2E_LAWYER_EMAIL;
  const password = process.env.E2E_LAWYER_PASSWORD;
  if (!email || !password) {
    throw new Error('E2E_LAWYER_EMAIL and E2E_LAWYER_PASSWORD must be set');
  }

  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  await page.goto('/login');
  await page.waitForLoadState('domcontentloaded');

  // Wait for inputs to be ready, then fill
  const emailInput = page.locator('input[type="email"]');
  await expect(emailInput).toBeVisible();
  await emailInput.fill(email);

  const passwordInput = page.locator('input[type="password"]');
  await expect(passwordInput).toBeVisible();
  await passwordInput.fill(password);

  await page.getByRole('button', { name: 'Přihlásit se' }).click();

  await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 30_000 });
  await page.waitForLoadState('domcontentloaded');

  // Save state including IndexedDB (Firebase stores auth tokens there)
  await page.context().storageState({ path: authFile, indexedDB: true });
});
