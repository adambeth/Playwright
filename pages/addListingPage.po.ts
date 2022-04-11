import { Page } from '@playwright/test'

export default class AddListingPage{
    Page: Page;

    constructor(page: Page){
        this.Page = page;
    }
    //Locators
    // Oporators
    noCaptain = async () => this.Page.locator('text =Customers will operate the vessel or trip themselves.')

    //Boat Categorys
    powerBoat = async () => this.Page.locator('text=Powerboats, pontoons & RIBs')
    airBoat = async () => this.Page.locator('text=Airboat')
    closebtn = async () => this.Page.locator('id=close')
    closeDialogue = async () => this.Page.locator('text=Close')
    x = async () => this.Page.locator('text=x')

    capacity = async () => this.Page.$('id=boat_capacity')
    loaction = async () => this.Page.$('id=boat-address')
    PE = async () => this.Page.locator('text=South Africa')

    selectRateDropDown = async () => this.Page.$('[data-id=watercraft_rate_type]')
    hourRate = async () => this.Page.locator('text=Hour')
    price = async () => this.Page.$('id=boat-price')
    saveBtn = async () => this.Page.locator('text=Save & Continue')

    uploadImageBtn =async () => this.Page.locator('text=Upload Images')
    public async addCompleteListing(){
        await (await this.noCaptain()).click();
        await (await this.powerBoat()).click();
        await (await this.airBoat()).click();
        await (await this.closeDialogue()).first().click();
        await (await this.capacity()).type('5');
        await (await this.loaction()).type('Port Elizabeth');
        await (await this.PE()).first().dblclick();
        await this.Page.waitForTimeout(2000);
        await (await this.selectRateDropDown()).click();
        // await (await this.hourRate()).last().dblclick();
        await this.Page.keyboard.press('ArrowDown')
        await this.Page.keyboard.press('ArrowDown')
        await this.Page.keyboard.press('Enter')
        await (await this.price()).type('3000')
        await (await this.saveBtn()).click();
        await this.Page.waitForURL("https://staging.getmyboat.com/boats/boats/boat_long_form/**")
        await this.Page.setInputFiles('id=file-upload',['resources/boatimages/boat1.jpeg','resources/boatimages/boat2.jpeg','resources/boatimages/boat3.jpeg'])
        await (await this.closebtn()).click();

    }
}
