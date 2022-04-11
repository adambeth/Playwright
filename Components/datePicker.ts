import { Page } from '@playwright/test';
export default class DatePicker{

    Page: Page;

    constructor(page: Page) {
        this.Page = page;
    }

async clickToday(){
    const today = new Date();
    const day = today.getDate().toString();
    const year = today.getFullYear().toString();
    const month = today.toLocaleString('default', { month: 'long' });
    const dayName = today.toLocaleString('default', { weekday: 'long' });
    await (await this.Page).click(`[aria-label="${dayName}, ${month} ${day}, ${year}"]`)
    await (await this.Page).click('text=Continue')



}

}