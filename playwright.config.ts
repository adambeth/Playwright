// playwright.config.js
// @ts-check
const { devices } = require('@playwright/test');
const str = "gmb:sailwithme"

// let buff = new Buffer(str);
// let base64data = buff.toString('base64');

// console.log('"' + str + '" converted to Base64 is "' + base64data + '"');
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: 'test',
  testMatch: '**/*.test.ts',
  timeout: 120000, //Playwright Test enforces a timeout for each testP
  actionTimeout: 5000,
  navigationTimeout: 5000,
  expect: {timeout:5000},
  workers:1,
  globalSetup: require.resolve('./global-setup-staging'),
  use:{
    extraHTTPHeaders: { 
      "User-Agent": "'GetMyBot'"
     },
    baseURL: 'https://staging.getmyboat.com/',
    ignoreHTTPSErrors: false,
  },
  projects: [
    // -- BrowserStack Projects --
    // name should be of the format browser@browser_version:os os_version@browserstack
    // {
    //   name: 'chrome@latest:Windows 10@browserstack',
    //   use: {
    //     browserName: 'chromium',
    //     channel: 'chrome',
    //   },
    // },
    // {
    //   name: 'chrome@latest:Windows 10@browserstack',
    //   use: {
    //     browserName: 'chromium',
    //     channel: 'chrome',
    //   },
    // },
    {
      name: 'chrome@latest:OSX Big Sur@browserstack',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
    //   name: 'edge@90:Windows 10@browserstack',
    //   use: {
    //     browserName: 'chromium'
    //   },
    // },
    // // {
    // //   name: 'playwright-firefox@latest:OSX Catalina@browserstack',
    // //   use: {
    // //     browserName: 'firefox',
    // //     ignoreHTTPSErrors: true
    // //   },
    // // },
    // // {
    // //   name: 'playwright-firefox@latest:Windows 10@browserstack',
    // //   use: {
    // //     browserName: 'firefox',
    // //     ignoreHTTPSErrors: true
    // //   },
    // // },
    // {
    //   name: 'playwright-webkit@latest:OSX Big Sur@browserstack',
    //   use: {
    //     browserName: 'webkit',
    //     // Config to use playwright emulated devices.
    //     ...devices['iPhone 12 Pro Max'],
    //   },
    // },

//     {
//       name: 'playwright-webkit@latest:OSX Big Sur@browserstack',
//       use: {
//         browserName: 'webkit',
//         // Config to use playwright emulated devices.
//         ...devices['iPhone 12 Pro Max'],
//       },
//     },
 // -- Local Projects --

    // Test against playwright browsers
    // {
    //   name: "chrome",
    //   use: {
    //     browserName: "chromium",
    //     // Test against Chrome channel.
    //     channel: "chrome",
    //   },
    // },
    // {
    //   name: "safari",
    //   use: {
    //     browserName: "webkit",
    //     viewport: { width: 1200, height: 750 },
    //   },
    // },
    // {
    //   name: "firefox",
    //   use: {
    //     browserName: "firefox",
    //     viewport: { width: 800, height: 600 },
    //   },
    // },
    //  Test against mobile viewports.
    // {
    //   name: "chrome@iPhone11",
    //   use: {
    //     ...devices["iPhone 11"]
    //   }
    // },
  ],
};
module.exports = config;
