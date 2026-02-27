import { test, expect } from '@playwright/test';
import { DealDetailPage } from '../../pages/deal-detail.page';
import { DealsListPage } from '../../pages/deals-list.page';

test('deal detail: heading and tabs visible', async ({ page }) => {
  const listPage = new DealsListPage(page);
  await listPage.goto();
  await listPage.waitForFirestoreData();

  const firstLink = page.locator('table tbody tr a').first();
  await firstLink.click();
  await page.waitForURL('**/deals/**');

  const detail = new DealDetailPage(page);
  await expect(detail.heading).toBeVisible();

  for (const { locator, name } of detail.allTabs) {
    await expect(locator, `Tab "${name}" should be visible`).toBeVisible();
  }

  await detail.paymentsTab.click();
  await page.waitForLoadState('domcontentloaded');
});
