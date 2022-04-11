import { Page } from '@playwright/test';
export default class ListingPage{

    Page: Page;

    constructor(page: Page) {
      this.Page = page;
    }

    sendBookingBtn = async () => this.Page.$('text=Send a Booking Inquiry')

    public async sendInquiry(){
        // await (await this.Page)?.waitForSelector('text=Send a Booking Inquiry')
        await (await this.sendBookingBtn())?.click();
    }
}