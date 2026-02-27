import type { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { TableComponent } from './components/table.component';

export class DealsListPage extends BasePage {
  readonly table: TableComponent;

  constructor(page: Page) {
    super(page);
    this.table = new TableComponent(page);
  }

  async goto() {
    await this.page.goto('/deals');
  }

  get searchInput() {
    return this.page.getByPlaceholder(/hledat|search/i);
  }

  async search(query: string) {
    await this.searchInput.fill(query);
  }

  spznLink(spzn: string) {
    return this.page.getByRole('link', { name: spzn });
  }
}
