import { test, expect } from '@playwright/test';
import { EscrowListPage } from '../../pages/escrow-list.page';

test('escrow table loads with data', async ({ page }) => {
  const escrowPage = new EscrowListPage(page);
  await escrowPage.goto();
  await escrowPage.waitForFirestoreData();

  expect(await escrowPage.table.rowCount()).toBeGreaterThan(0);
});
