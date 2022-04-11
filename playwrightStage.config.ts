import { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  retries: 0,
  workers: 4,
  timeout: 90000,
  projects: [
    {
      name: "Staging",
      use: {
        headless: false,
        extraHTTPHeaders: { "User-Agent": "'GetMyBot'" },
        baseURL: 'https://staging.getmyboat.com/',
        channel: 'chrome',
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        httpCredentials: { username: 'gmb', password: 'sailwithme', },
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',

      }
    }
  ],
  /*
  add fire fox
  add webkit
  */
  reporter: [["dot"], ["json", { outputFile: "test-result.json" }],
  ['allure-playwright']],
  // globalSetup: require.resolve('./global-setup-staging'), 
  // forbidOnly: true
};
export default config;