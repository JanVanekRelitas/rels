import type { Page, Locator } from '@playwright/test';

export class TableComponent {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page, root?: Locator) {
    this.page = page;
    this.root = root ?? page.locator('table').first();
  }

  get headers(): Locator {
    return this.root.locator('thead th');
  }

  get rows(): Locator {
    return this.root.locator('tbody tr');
  }

  row(index: number): Locator {
    return this.rows.nth(index);
  }

  cell(rowIndex: number, colIndex: number): Locator {
    return this.row(rowIndex).locator('td').nth(colIndex);
  }

  async rowCount(): Promise<number> {
    return this.rows.count();
  }

  async headerTexts(): Promise<string[]> {
    return this.headers.allTextContents();
  }
}
