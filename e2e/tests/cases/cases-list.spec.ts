import { test, expect } from '@playwright/test';
import { CasesListPage } from '../../pages/cases-list.page';
import { cs } from '../../helpers/i18n';

test('cases list: columns, data, search, SPZN links', async ({ page }) => {
  const casesPage = new CasesListPage(page);
  await casesPage.goto();
  await casesPage.waitForFirestoreData();

  const headers = await casesPage.table.headerTexts();
  const headerText = headers.join(' ');
  expect(headerText).toContain(cs.deal.spzn);
  expect(headerText).toContain(cs.case.pripad);
  expect(headerText).toContain(cs.deal.klient);
  expect(headerText).toContain(cs.case.stav);

  expect(await casesPage.table.rowCount()).toBeGreaterThan(0);

  await casesPage.search('636');
  await page.waitForTimeout(1000);
  expect(await casesPage.table.rowCount()).toBeGreaterThan(0);

  await casesPage.search('');
  await page.waitForTimeout(500);
  const firstLink = page.locator('table tbody tr a').first();
  await firstLink.click();
  await page.waitForURL('**/cases/**');
  expect(page.url()).toContain('/cases/');
});
