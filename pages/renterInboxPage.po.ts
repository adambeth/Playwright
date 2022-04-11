import { Page } from '@playwright/test'

export default class RenterInboxPage{
    Page: Page;

    constructor(page: Page){
        this.Page = page;
    }
    //Locators
    tripCard = async () => this.Page.$('[data-test=TripCard]')
    bookNowBtn = async () =>this.Page.$("text=Book Now")
    proceedToPaymentBtn = async () => this.Page.$("text=Proceed to Payment")

    
    // add price page
    // priceInput = async () => this.Page.locator('id=subtotal')
    // public async createOffer(){
    //     await (await this.createOfferBtn()).click();
    //     await (await this.priceInput()).type('250')
    //     await (await this.sendOfferBtn()).click()
        
    // }

    // public async clickBookNow(){
    //     await
    // }
}