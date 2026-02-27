import { test, expect } from '@playwright/test';
import { SidebarComponent } from '../../pages/components/sidebar.component';
import { cs } from '../../helpers/i18n';

test('all sidebar nav links are visible and navigate correctly', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  const sidebar = new SidebarComponent(page);

  // Check all main nav links are visible
  for (const { locator, name } of sidebar.mainNavLinks) {
    await expect(locator, `"${name}" should be visible`).toBeVisible();
  }
  await expect(sidebar.admin, '"Nastavení" should be visible').toBeVisible();

  // Click each link and verify navigation
  const navTests = [
    { name: cs.nav.deals, path: '/deals' },
    { name: cs.nav.cases, path: '/cases' },
    { name: cs.nav.tasks, path: '/tasks' },
    { name: cs.nav.contacts, path: '/contacts' },
    { name: cs.nav.escrow, path: '/escrow' },
    { name: cs.nav.registry, path: '/registry' },
    { name: cs.nav.finance, path: '/finance' },
    { name: cs.nav.attendance, path: '/attendance' },
    { name: cs.nav.cadastral, path: '/cadastral' },
    { name: cs.nav.admin, path: '/admin' },
  ];

  for (const { name, path } of navTests) {
    await sidebar.link(name).click();
    await page.waitForURL(`**${path}`, { timeout: 10_000 });
    expect(page.url(), `Clicking "${name}" should navigate to ${path}`).toContain(path);
  }
});
