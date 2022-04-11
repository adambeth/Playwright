import { Page } from '@playwright/test';
export default class OfferSentPage{
    Page: Page;

constructor(page: Page) {
    this.Page = page;
  }

  //Locators
  optionBtn = async () => this.Page.locator('button:has-text("Options")');
  sendMessageOption = async()  => this.Page.locator('text=Send a Message');
  cancelInquiryOption = async () => this.Page.locator('text=Cancel Inquiry');
  cancelInquiryBtn = async () => this.Page.locator("button:has-text('Cancel Inquiry')").last();
  public async clickOptions(){
      await (await this.optionBtn()).click();
  }
  public async clickSendMessage(){
    await (await this.sendMessageOption()).click();
}
}