import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 *
 * Test configuration for Playwright.
 * https://playwright.dev/docs/test-configuration
 */

// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Each test is given 30 seconds.
  timeout: 30_000, // 30 seconds

  // This is the maximum time a testsuite can run before it is considered failed.
  // This is useful for preventing tests from running indefinitely.
  globalTimeout: 10 * 60 * 1000, // 10 minutes

  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: "./tests",
  /* Run  all tests in files in parallel? */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0, // Retry failed tests on CI
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: "test-results",

  // path to the global setup files.
  //  globalSetup: require.resolve('./global-setup'),

  // path to the global teardown files.
  //  globalTeardown: require.resolve('./global-teardown'),

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://www.saucedemo.com",
    testIdAttribute: "data-test", // Use data-test attribute for test IDs

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    actionTimeout: 0, // No timeout for actions
    navigationTimeout: 0, // No timeout for navigation
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    screenshot: "only-on-failure", // Take a screenshot only on failure
    video: "retain-on-failure", // Record video only on failure
    headless: true, // Run tests in headless mode
   
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: true, // Run tests in headless mode
        launchOptions: {
          args: ['--start-maximized'], // Launch with maximized window
        },
      },
    },
  
    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"] },
    //   launchOptions: {
    //     args: ['--start-maximized'], // Firefox support for this argument
    //   },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
