import { Page } from '@playwright/test';
export default class InboxMessagePage{
    Page: Page;

  constructor(page: Page) {
    this.Page = page;
  }

  //Locators
  messageInput = async () => this.Page.locator('[placeholder="Type a message"]');
  sendBtn = async()  => this.Page.locator('button:has-text("Send")');

  public async sendMessage(){
      await (await this.messageInput()).fill('Im on a boat MF');
      await (await this.sendBtn()).click();
  }

}