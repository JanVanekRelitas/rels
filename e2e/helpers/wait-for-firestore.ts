import type { Page } from '@playwright/test';

/**
 * Wait for Firestore data to load:
 * 1. Wait for any loading spinner to disappear
 * 2. Wait for table rows to appear
 */
export async function waitForFirestoreData(page: Page, options?: { timeout?: number }) {
  const timeout = options?.timeout ?? 15_000;

  // Wait for spinner to disappear (if present)
  const spinner = page.locator('.animate-spin');
  if (await spinner.isVisible({ timeout: 2_000 }).catch(() => false)) {
    await spinner.waitFor({ state: 'detached', timeout });
  }

  // Wait for at least one table row
  await page.locator('table tbody tr').first().waitFor({ state: 'visible', timeout });
}
