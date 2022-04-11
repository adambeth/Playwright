import { Page } from '@playwright/test'

export default class OwnerInboxPage{
    Page: Page;

    constructor(page: Page){
        this.Page = page;
    }
    //Locators
    createOfferBtn = async () => this.Page.locator('text=Create Offer')
    sendOfferBtn = async () => this.Page.locator('text= Send Offer')
    customOfferExpiryToggle = async () =>this.Page.locator('id=coeToggle')
    
    //add price page
    priceInput = async () => this.Page.locator('id=subtotal')
    public async createOffer(){
        await (await this.createOfferBtn()).click();
        await (await this.priceInput()).type('250')
        await (await this.sendOfferBtn()).click()
        
    }
    public async createCustomOfferExpiry(){
        await (await this.createOfferBtn()).click();
        await (await this.priceInput()).type('250')
        await (await this.customOfferExpiryToggle()).click();
        await (await this.sendOfferBtn()).click()
        
    }
}