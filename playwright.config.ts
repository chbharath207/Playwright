import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/api',
  fullyParallel: false,
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL: 'https://petstore.swagger.io/v2/',
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'api-tests',
      testDir: './tests/api',
    },
  ],
});