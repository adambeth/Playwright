import { Page } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import * as faker from 'faker';

export default class Register {
  Page: Page;

  constructor(page: Page) {
    this.Page = page;
  }   
  // Locators 
  firstName = async () => this.Page.locator('[placeholder="First Name"]');
  lastName = async () => this.Page.locator('[placeholder="Last Name"]');
  email = async () => this.Page.locator('[placeholder="Email Address"]');
  phone = async () => this.Page.locator('[placeholder="Phone number"]');
  password1 = async () => this.Page.locator('[placeholder="Password"]')
  password2 = async () => this.Page.locator('[placeholder="Re-enter Password"]')
  noBtn = async () => this.Page.locator('[for="marketing_consent-no"]')

  
  public async registerUser() {
    await (await this.firstName())?.fill(faker.name.firstName())
    await (await this.lastName())?.fill(faker.name.lastName())
    await (await this.email())?.fill(`adam+test-${uuidv4()}@testmyboat.com`)
    await (await this.phone())?.fill(faker.phone.phoneNumber('+2782#######'))
    await (await this.password1())?.fill('password')
    await (await this.password2())?.fill('password')
    await (await this.noBtn())?.click()
  }
  public async bookingRegistration() {
    await (await this.firstName())?.fill(faker.name.firstName())
    await (await this.lastName())?.fill(faker.name.lastName())
    await (await this.email())?.fill(`adam+test-${uuidv4()}@testmyboat.com`)
    await (await this.phone())?.fill(faker.phone.phoneNumber('+2782#######'))
    await (await this.noBtn())?.click()
  }

  public async clickCreateAccount() {
    await this.Page.click('[data-test="Button"]')
  }
  public async clickAccept() {
    await this.Page.click('[data-test="Button"]')
    // await this.Page.click('text=Accept',{force:true})
  }
}
