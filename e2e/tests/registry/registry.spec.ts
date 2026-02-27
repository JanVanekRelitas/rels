import { test, expect } from '@playwright/test';
import { RegistryPage } from '../../pages/registry.page';

test('registry: tabs switch and have inputs', async ({ page }) => {
  const registryPage = new RegistryPage(page);
  await registryPage.goto();

  await expect(registryPage.aresTab).toBeVisible();
  await registryPage.aresTab.click();
  await expect(page.locator('input').first()).toBeVisible();

  await expect(registryPage.ruianTab).toBeVisible();
  await registryPage.ruianTab.click();
  await expect(page.locator('input').first()).toBeVisible();

  await expect(registryPage.katastrTab).toBeVisible();
  await registryPage.katastrTab.click();
  await expect(page.locator('input').first()).toBeVisible();
});
