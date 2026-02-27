import { test, expect } from '@playwright/test';
import { TasksListPage } from '../../pages/tasks-list.page';
import { cs } from '../../helpers/i18n';

test('tasks list: columns, data, badges', async ({ page }) => {
  const tasksPage = new TasksListPage(page);
  await tasksPage.goto();
  await tasksPage.waitForFirestoreData();

  const headers = await tasksPage.table.headerTexts();
  const headerText = headers.join(' ');
  expect(headerText).toContain(cs.deal.spzn);
  expect(headerText).toContain(cs.task.ukol);

  expect(await tasksPage.table.rowCount()).toBeGreaterThan(0);

  const badges = page.locator('table tbody').locator('span, [class*="badge"]');
  expect(await badges.count()).toBeGreaterThan(0);
});
