import { test, expect } from '@playwright/test';

const routes = [
  { name: 'Dashboard', path: '/' },
  { name: 'Deals', path: '/deals' },
  { name: 'Cases', path: '/cases' },
  { name: 'Tasks', path: '/tasks' },
  { name: 'Cadastral', path: '/cadastral' },
  { name: 'Escrow', path: '/escrow' },
  { name: 'Contacts', path: '/contacts' },
  { name: 'Finance', path: '/finance' },
  { name: 'Attendance', path: '/attendance' },
  { name: 'Registry', path: '/registry' },
  { name: 'Admin', path: '/admin' },
];

test('all pages load without errors', async ({ page }) => {
  const jsErrors: string[] = [];
  page.on('pageerror', (error) => jsErrors.push(error.message));

  for (const route of routes) {
    await page.goto(route.path);
    await page.waitForLoadState('domcontentloaded');
    expect(page.url(), `${route.name} should not redirect to /login`).not.toContain('/login');
  }

  expect(jsErrors).toEqual([]);
});
