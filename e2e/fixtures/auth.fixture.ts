import { test as base, type Page } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

/**
 * Custom test fixture that authenticates via login page.
 * After login, provides the page already on the dashboard.
 * IMPORTANT: Use `navigateTo()` for subsequent navigation (client-side)
 * instead of `page.goto()` to avoid auth middleware race condition.
 */
export const test = base.extend<{ authedPage: Page }>({
  authedPage: async ({ page }, use) => {
    const email = process.env.E2E_LAWYER_EMAIL;
    const password = process.env.E2E_LAWYER_PASSWORD;
    if (!email || !password) {
      throw new Error('E2E_LAWYER_EMAIL and E2E_LAWYER_PASSWORD must be set');
    }

    // Navigate to login and authenticate
    await page.goto('/login');
    await page.locator('input[type="email"]').fill(email);
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole('button', { name: 'Přihlásit se' }).click();
    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 30_000 });
    await page.waitForLoadState('domcontentloaded');

    await use(page);
  },
});

export { expect } from '@playwright/test';

/**
 * Navigate using Vue Router (client-side) to avoid full page reload
 * which triggers auth middleware before Firebase restores session.
 */
export async function navigateTo(page: Page, path: string) {
  await page.evaluate((p) => {
    const el = document.querySelector('#__nuxt') as any;
    const router = el?.__vue_app__?.config?.globalProperties?.$router;
    if (router) {
      router.push(p);
    } else {
      window.location.href = p;
    }
  }, path);
  // Wait for route change to complete
  await page.waitForURL(`**${path}`, { timeout: 15_000 });
  await page.waitForLoadState('domcontentloaded');
}
