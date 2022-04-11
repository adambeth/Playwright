import { expect, Page } from '@playwright/test';
export default class SignInPage{

Page:Page;
constructor(page: Page) {
    this.Page = page;
  }
  email = async () => this.Page.locator('[placeholder="Email Address"]');
  password = async () => this.Page.locator('[placeholder="Password"]')
  signInBtn = async () => this.Page.locator('[data-test="Button"]')
  forgotPasswordLink = async () => this.Page.locator('text="Forgot your password?"')

  public async login() {
      await (await this.email())?.fill('user@testmyboat.com')
      await (await this.password())?.fill('password')
      await this.clickSignIn()
  }

  public async clickSignIn(){
      await (await this.signInBtn())?.click()
  }

  public async clickForgotPassword(){
      await (await this.forgotPasswordLink())?.click()
  }
}