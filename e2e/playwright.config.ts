import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const baseURL = process.env.BASE_URL || 'https://rels-695409269430.europe-west1.run.app';
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 15_000 },

  reporter: isCI
    ? [['html', { open: 'never' }], ['github'], ['json', { outputFile: 'test-results/results.json' }]]
    : [['html', { open: 'on-failure' }], ['list']],

  use: {
    baseURL,
    locale: 'cs-CZ',
    timezoneId: 'Europe/Prague',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
    launchOptions: {
      channel: isCI ? undefined : 'chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  },

  projects: [
    // Setup: log in once, save storageState with IndexedDB
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    // Main tests: use saved auth state
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth/lawyer.json',
      },
      dependencies: ['setup'],
    },
    // Auth tests: no storageState (test login/logout flows)
    {
      name: 'no-auth',
      testMatch: /tests\/auth\/.*/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
