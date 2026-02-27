import { test, expect } from '@playwright/test';
import { ContactsListPage } from '../../pages/contacts-list.page';
import { cs } from '../../helpers/i18n';

test('contacts list: columns, data, search', async ({ page }) => {
  const contactsPage = new ContactsListPage(page);
  await contactsPage.goto();
  await contactsPage.waitForFirestoreData();

  const headers = await contactsPage.table.headerTexts();
  const headerText = headers.join(' ');
  expect(headerText).toContain(cs.contact.jmeno);
  expect(headerText).toContain(cs.contact.typ);
  expect(headerText).toContain(cs.contact.telefon);
  expect(headerText).toContain(cs.contact.email);
  expect(headerText).toContain(cs.contact.ico);

  const initialCount = await contactsPage.table.rowCount();
  expect(initialCount).toBeGreaterThan(0);

  await contactsPage.search('Novák');
  await page.waitForTimeout(1000);
  expect(await contactsPage.table.rowCount()).toBeLessThanOrEqual(initialCount);
});
