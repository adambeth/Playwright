import { Page } from '@playwright/test';
export default class HomePage{
    Page: Page;

  constructor(page: Page) {
    this.Page = page;
  }

  //Locators
  searchInput = async () => this.Page.$('[data-test="SearchInput"]')
  mainMenuBtn = async () => this.Page.$('[data-test="MainMenuDropDown"]')
  addListing = async () => this.Page.locator('text=Your Listings')


  public async search(search:string, clickText:string) {
      await (await this.searchInput())?.fill(search)
      await this.Page.click(`text=${clickText}`);
      
  }

  public async addListingNavigation(){
    await (await this.mainMenuBtn()).click();
    await (await this.addListing()).click();
  }
  
}