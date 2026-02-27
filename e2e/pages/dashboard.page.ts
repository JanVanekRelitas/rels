import type { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { TableComponent } from './components/table.component';
import { cs } from '../helpers/i18n';

export class DashboardPage extends BasePage {
  readonly table: TableComponent;

  constructor(page: Page) {
    super(page);
    this.table = new TableComponent(page);
  }

  async goto() {
    await this.page.goto('/');
  }

  get newDealButton() {
    return this.page.getByRole('link', { name: cs.deal.new });
  }

  spznLink(spzn: string) {
    return this.page.getByRole('link', { name: spzn });
  }
}
