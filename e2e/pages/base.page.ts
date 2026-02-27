import type { Page } from '@playwright/test';
import { SidebarComponent } from './components/sidebar.component';
import { waitForFirestoreData } from '../helpers/wait-for-firestore';

export abstract class BasePage {
  readonly page: Page;
  readonly sidebar: SidebarComponent;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = new SidebarComponent(page);
  }

  abstract goto(): Promise<void>;

  async waitForFirestoreData(options?: { timeout?: number }) {
    await waitForFirestoreData(this.page, options);
  }
}
