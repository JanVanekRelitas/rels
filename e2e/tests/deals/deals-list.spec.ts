import { test, expect } from '@playwright/test';
import { DealsListPage } from '../../pages/deals-list.page';
import { cs } from '../../helpers/i18n';

test('deals list: columns, data, search, click-through', async ({ page }) => {
  const dealsPage = new DealsListPage(page);
  await dealsPage.goto();
  await dealsPage.waitForFirestoreData();

  // Correct columns
  const headers = await dealsPage.table.headerTexts();
  const headerText = headers.join(' ');
  expect(headerText).toContain(cs.deal.spzn);
  expect(headerText).toContain(cs.deal.nazev);
  expect(headerText).toContain(cs.deal.klient);
  expect(headerText).toContain(cs.deal.typ);

  // Has data
  const initialCount = await dealsPage.table.rowCount();
  expect(initialCount).toBeGreaterThan(0);

  // Search filters
  await dealsPage.search('Kremsenko');
  await page.waitForTimeout(1000);
  const filteredCount = await dealsPage.table.rowCount();
  expect(filteredCount).toBeLessThan(initialCount);
  expect(filteredCount).toBeGreaterThan(0);

  // Click through to detail
  await dealsPage.search('');
  await page.waitForTimeout(500);
  const firstLink = page.locator('table tbody tr a').first();
  await firstLink.click();
  await page.waitForURL('**/deals/**');
  expect(page.url()).toContain('/deals/');
});
