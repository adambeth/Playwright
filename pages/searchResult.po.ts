import { Page } from '@playwright/test';

export default class SearchResultPage{

    Page: Page;

    constructor(page: Page) {
      this.Page = page;
    }

    result = async () => this.Page.locator('data-test=ListingCard')
    groupSizeFilter = async () => this.Page.locator('button:has-text("Group Size")')
    increaseBtn = async () => this.Page.locator('[aria-label="Increase value"]')


}