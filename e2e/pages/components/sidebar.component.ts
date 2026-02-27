import type { Page, Locator } from '@playwright/test';
import { cs } from '../../helpers/i18n';

export class SidebarComponent {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator('aside, nav').first();
  }

  link(name: string): Locator {
    return this.page.getByRole('link', { name });
  }

  get dashboard() { return this.link(cs.nav.dashboard); }
  get deals() { return this.link(cs.nav.deals); }
  get cases() { return this.link(cs.nav.cases); }
  get tasks() { return this.link(cs.nav.tasks); }
  get cadastral() { return this.link(cs.nav.cadastral); }
  get escrow() { return this.link(cs.nav.escrow); }
  get contacts() { return this.link(cs.nav.contacts); }
  get finance() { return this.link(cs.nav.finance); }
  get attendance() { return this.link(cs.nav.attendance); }
  get registry() { return this.link(cs.nav.registry); }
  get admin() { return this.link(cs.nav.admin); }

  /** All main nav links (not admin) */
  get mainNavLinks() {
    return [
      { locator: this.dashboard, name: cs.nav.dashboard, path: '/' },
      { locator: this.deals, name: cs.nav.deals, path: '/deals' },
      { locator: this.cases, name: cs.nav.cases, path: '/cases' },
      { locator: this.tasks, name: cs.nav.tasks, path: '/tasks' },
      { locator: this.cadastral, name: cs.nav.cadastral, path: '/cadastral' },
      { locator: this.escrow, name: cs.nav.escrow, path: '/escrow' },
      { locator: this.contacts, name: cs.nav.contacts, path: '/contacts' },
      { locator: this.finance, name: cs.nav.finance, path: '/finance' },
      { locator: this.attendance, name: cs.nav.attendance, path: '/attendance' },
      { locator: this.registry, name: cs.nav.registry, path: '/registry' },
    ];
  }
}
