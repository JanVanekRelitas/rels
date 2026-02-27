import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard.page';
import { cs } from '../../helpers/i18n';

test('dashboard: table, phase headers, SPZN links, new deal button', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.goto();
  await dashboard.waitForFirestoreData();

  // Table has data
  const rowCount = await dashboard.table.rowCount();
  expect(rowCount).toBeGreaterThan(50);

  // Phase columns present
  const headers = await dashboard.table.headerTexts();
  const headerText = headers.join(' ');
  for (const phase of Object.values(cs.phase)) {
    expect(headerText, `Phase "${phase}" header missing`).toContain(phase);
  }

  // SPZN links point to /deals/
  const spznLink = page.locator('table tbody tr a').first();
  const href = await spznLink.getAttribute('href');
  expect(href).toContain('/deals/');

  // "Nový obchod" button
  await expect(dashboard.newDealButton).toBeVisible();
});
