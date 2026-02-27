import type { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { cs } from '../helpers/i18n';

export class DealDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(spzn?: string) {
    if (spzn) {
      await this.page.goto(`/deals/${spzn}`);
    }
  }

  get heading() {
    return this.page.locator('h1, h2').first();
  }

  tab(name: string) {
    return this.page.getByRole('tab', { name }).or(
      this.page.getByRole('link', { name })
    );
  }

  get overviewTab() { return this.tab(cs.deal.overview); }
  get paymentsTab() { return this.tab(cs.deal.payments); }
  get escrowTab() { return this.tab(cs.deal.escrow); }
  get cadastralTab() { return this.tab(cs.deal.cadastral); }
  get documentsTab() { return this.tab(cs.deal.documents); }

  get allTabs() {
    return [
      { locator: this.overviewTab, name: cs.deal.overview },
      { locator: this.paymentsTab, name: cs.deal.payments },
      { locator: this.escrowTab, name: cs.deal.escrow },
      { locator: this.cadastralTab, name: cs.deal.cadastral },
      { locator: this.documentsTab, name: cs.deal.documents },
    ];
  }
}
