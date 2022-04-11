import { chromium } from '@playwright/test'
import request from "supertest";
async function globalSetup() {
  console.log('Start Global Setup')
  await createAccount('owner@testmyboat.com')
  await createAccount('renter@testmyboat.com')
  await createAccount('user@testmyboat.com')
  await createOwnerCookies()
  await createRenterCookie()
  await createBannerCookie()

  console.log("Global Setup Complete")
}
export default globalSetup;

async function createOwnerCookies() {
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome'
  });
  const context = await browser.newContext({});
  const page = await context.newPage();

  await page.goto('http://dev.getmyboat.com/s/auth/login/');
  await page.waitForSelector('[placeholder="Email Address"]');
  await page.fill('[placeholder="Email Address"]', 'owner@testmyboat.com');
  await page.fill('[placeholder="Password"]', 'password');
  await page.click('text="Close"');
  await page.click('text="Sign In"');
  await page.waitForNavigation({
    timeout: 60000,
    url: 'http://dev.getmyboat.com/',
  });
  await page.context().storageState({ path: './cookies/owner_cookie.json' });
  await browser.close();
}

async function createRenterCookie() {
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome'
  });
  const context = await browser.newContext({});
  const page = await context.newPage();

  await page.goto('http://dev.getmyboat.com/s/auth/login/');
  await page.waitForSelector('[placeholder="Email Address"]');
  await page.fill('[placeholder="Email Address"]', 'renter@testmyboat.com');
  await page.fill('[placeholder="Password"]', 'password');
  await page.click('text="Close"');
  await page.click('text="Sign In"');
  await page.waitForNavigation({  
    timeout: 60000,
    url: 'http://dev.getmyboat.com/',
  });

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
  await page.goto('http://dev.getmyboat.com/');
  await page.click('text="Close"');
  await page.context().storageState({ path: './cookies/banner.json' });
  await browser.close();
}

async function createAccount(email: string) {

  await request('http://dev.getmyboat.com')
    .post('/api/v4/auth/registration/')
    .send({
      terms_agreed: true,
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