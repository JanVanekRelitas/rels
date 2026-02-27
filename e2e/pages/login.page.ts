import type { Page } from '@playwright/test';
import { cs } from '../helpers/i18n';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get emailInput() { return this.page.locator('input[type="email"]'); }
  get passwordInput() { return this.page.locator('input[type="password"]'); }
  get submitButton() { return this.page.getByRole('button', { name: cs.auth.signIn }); }
  get errorAlert() { return this.page.locator('[role="alert"]'); }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
