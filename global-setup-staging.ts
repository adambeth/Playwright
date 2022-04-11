import { chromium } from '@playwright/test'
import request from "supertest";
async function globalSetup() {
  console.log('Start Global Setup Staging')
  await createBannerCookie()
  await createRenterCookie()
  await createOwnerCookies()
  console.log("Global Setup Complete")
}
export default globalSetup;

async function createOwnerCookies() {
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome'
  });
  const context = await browser.newContext({ httpCredentials: { username: 'gmb', password: 'sailwithme', } });
  await context.tracing.start({ screenshots: true, snapshots: true });
  const page = await context.newPage();
  await page.goto('https://staging.getmyboat.com/account/login/');
  await page.fill('[placeholder="Email"]', 'owner@testmyboat.com');
  await page.fill('[placeholder="Password"]', 'password');
  await page.click('text="Sign in"');
  await page.waitForNavigation({
    url: "https://staging.getmyboat.com/",
    timeout: 30000
  });

  await page.waitForURL("https://staging.getmyboat.com/")
  await page.click('text="Close"');
  await page.context().storageState({ path: './cookies/owner_cookie.json' });
  await browser.close();
}

async function createRenterCookie() {
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
  });
  const context = await browser.newContext({ httpCredentials: { username: 'gmb', password: 'sailwithme', } });
  await context.tracing.start({ screenshots: true, snapshots: true });
  const page = await context.newPage();
  await page.goto('https://staging.getmyboat.com/account/login/');
  await page.fill('[placeholder="Email"]', 'renter@testmyboat.com');
  await page.fill('[placeholder="Password"]', 'password');
  await page.click('text="Sign in"');

   await page.waitForNavigation({
    url: "https://staging.getmyboat.com/",
    timeout: 30000
  });

    // await page.waitForURL("https://staging.getmyboat.com/")
  await page.click('text="Close"');
  await page.context().storageState({ path: './cookies/renter_cookie.json' });
  await browser.close();

}

async function createBannerCookie() {
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome'
  });
  const context = await browser.newContext({});
  const page = await context.newPage();
  await page.goto('https://gmb:sailwithme@staging.getmyboat.com/');
  // await page.waitForURL("https://staging.getmyboat.com/")
  await page.click('text="Close"');
  await page.context().storageState({ path: './cookies/banner.json' });
  await browser.close();
}

async function createAccount(email: string) {

  await request('https://staging.getmyboat.com')
    .post('/api/v4/auth/registration/')
    .send({
      terms_agreed: false,
      first_name: 'Captain',
      last_name: "boat",
      email: email,
      phone: '+27865443442',
      password1: 'password',
      password2: 'password',
      marketing_consent: true,
    })
    .then(response => {
      if (response.statusCode === 400) {
        console.log(`${email} Already Exists`);
      } else {
        console.log(`${email} Account Created`)
      }

    })
}