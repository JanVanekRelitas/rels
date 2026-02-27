import { expect, type Page } from '@playwright/test';
import { cs } from '../helpers/i18n';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get emailInput() { return this.page.locator('input[type="email"]'); }
  get passwordInput() { return this.page.locator('input[type="password"]'); }
  get submitButton() { return this.page.getByRole('button', { name: cs.auth.signIn }); }
  get errorAlert() { return this.page.locator('.bg-error'); }

  async goto() {
    await this.page.goto('/login', { waitUntil: 'networkidle' });
    // Wait for Nuxt client-side hydration to complete
    await this.page.waitForFunction(() => !!window.__NUXT__);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    // Verify value survived hydration
    await expect(this.emailInput).toHaveValue(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
