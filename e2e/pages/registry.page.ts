import type { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { cs } from '../helpers/i18n';

export class RegistryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto('/registry');
  }

  tab(name: string) {
    return this.page.getByRole('tab', { name }).or(
      this.page.getByRole('link', { name })
    );
  }

  get aresTab() { return this.tab(cs.registry.ares); }
  get ruianTab() { return this.tab(cs.registry.ruian); }
  get katastrTab() { return this.tab(cs.registry.katastr); }
}
