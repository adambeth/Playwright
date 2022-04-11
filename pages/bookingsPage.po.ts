
import { Page, expect } from '@playwright/test';
import DatePicker from '../Components/datePicker';
import registerPage from './registerPage.po';
export default class BookingsPage {

    Page: Page;
    datePicker: DatePicker;

    constructor(page: Page) {
        this.Page = page;
    }

    result = async () => this.Page.locator('data-test=ListingCard')
    sendInquiryBtn = async () => this.Page.locator('text=Send')
    continue = async () => this.Page.locator('button:has-text("Continue")')
    nextBtn = async () => this.Page.locator('text=Next')
    skipBtn = async () => this.Page.locator('button:has-text("Skip")')
    doneBtn = async () => this.Page.locator('text=Done')
    noCaptainBtn = 'text=No thanks, we have enough experience.'
    adultsInput = 'data-test=GroupSizeAdultsInput';
    seniorsInput = 'data-test=GroupSizeSeniorsInput';
    childrenInput = 'data-test=GroupSizeChildrenInput';
    infantsInput = 'data-test=GroupSizeInfantsInput';
    hoursInput = 'data-test=DurationHoursInput';
    minutesInput = 'data-test=DurationMinutesInput';
    overNightInput = 'data-test=DurationNightsInput';
    preferredDatePicker = '[placeholder="Preferred date"]'

    private async clickSkip(){
        await (await this.Page)?.click('button:has-text("Skip")')
    }

    public async completeBooking({
        hours = '4',
        minutes = '5',
        overnight = '0',
        adults = '3',
        seniors = '1',
        children = '1',
        infants = '1',
        needsCaptain = true,
        isSignedIn = true,
    }: {
        hours?: string,
        minutes?: string,
        overnight?: string,
        adults?: string,
        seniors?: string,
        children?: string,
        infants?: string,
        needsCaptain?: boolean,
        isSignedIn?: boolean
    }) {
        if (isSignedIn) {
            if (needsCaptain) {
                await (await (await this.result()).first().click())
                await (await this.sendInquiryBtn()).click();
                await (await this.continue())?.click()
                await (await this.Page).fill(this.hoursInput, hours)
                await (await this.Page).fill(this.minutesInput, minutes)
                await (await this.Page).fill(this.hoursInput, hours)
                await (await this.nextBtn())?.click()
                await (await this.Page).click(this.preferredDatePicker)
                let date = new DatePicker(this.Page)
                await (await date.clickToday())
                await (await this.nextBtn())?.click()
                //Departure time
                await this.clickSkip();
                //groupSize
                await (await this.Page).fill(this.adultsInput, adults)
                await (await this.nextBtn())?.click()
                //Captain
                await (await this.nextBtn())?.click()
                //Anything Else
                await this.Page.waitForSelector('text=Anything Else?')
                await this.clickSkip();
                // Your Contact
                await (await this.nextBtn())?.click()
                try{
                    await (this.Page.click('text=No Thanks'))
                }catch(e){console.log(e)}
                //Done
                await (await this.doneBtn())?.click()
            } else {
                await (await (await this.result()).first().click())
                await (await this.sendInquiryBtn()).click();
                await (await this.continue())?.click()
                await (await this.Page).fill(this.hoursInput, hours)
                await (await this.Page).fill(this.minutesInput, minutes)
                await (await this.Page).fill(this.hoursInput, hours)
                await (await this.nextBtn())?.click()
                await (await this.Page).click(this.preferredDatePicker)
                let date = new DatePicker(this.Page)
                await (await date.clickToday())
                await (await this.nextBtn())?.click()
                await this.clickSkip();
                await (await this.Page).fill(this.adultsInput, adults)
                await (await this.nextBtn())?.click()
                await (await this.Page).click(this.noCaptainBtn)
                await (await this.nextBtn())?.click()
                await this.clickSkip();
                await this.clickSkip();
                await (await this.nextBtn())?.click()
                try{
                    await (this.Page.click('text=No Thanks'))
                }catch(e){console.log(e)}
                await (await this.doneBtn())?.click()
            }
        } else {
            if (needsCaptain) {
                await (await (await this.result()).first().click())
                await (await this.sendInquiryBtn()).click();
                await (await this.continue())?.click()
                await (await this.Page).fill(this.hoursInput, hours)
                await (await this.Page).fill(this.minutesInput, minutes)
                await (await this.Page).fill(this.hoursInput, hours)
                await (await this.nextBtn())?.click()
                await (await this.Page).click(this.preferredDatePicker)
                let date = new DatePicker(this.Page)
                await (await date.clickToday())
                await (await this.nextBtn())?.click()
                await this.clickSkip();
                await (await this.Page).fill(this.adultsInput, adults)
                await (await this.nextBtn())?.click()
                await (await this.nextBtn())?.click()
                await this.clickSkip();
                let regPage = new registerPage(this.Page);
                await (await this.Page).waitForSelector('text=Your Contact Details')
                await (await regPage.bookingRegistration())
                await (await this.nextBtn())?.click()
                await (await this.Page).fill('[placeholder="Password"]', 'password')
                await (await this.Page).fill('[placeholder="Re-enter Password"]', 'password')
                await (await this.Page).click('text=Create Account')
                await (await this.Page).click('data-test=Button')
                await (await this.nextBtn())?.click()

                if (this.Page.url().includes('staging')) {

                    await (this.Page.click('text=No Thanks'))
                }

                try {
                    await (await this.doneBtn())?.click()
                }
                catch (e) {
                    console.log(e.message)
                }

            } else {

                await (await (await this.result()).first().click())
                await (await this.sendInquiryBtn()).click();
                await (await this.continue())?.click()
                await (await this.Page).fill(this.hoursInput, hours)
                await (await this.nextBtn())?.click()
                await (await this.Page).click(this.preferredDatePicker)
                let date = new DatePicker(this.Page)
                await (await date.clickToday())
                await (await this.nextBtn())?.click()
                await this.clickSkip();
                await (await this.Page).fill(this.adultsInput, adults)
                await (await this.nextBtn())?.click()
                await (await this.Page).click(this.noCaptainBtn)
                await (await this.nextBtn())?.click()
                await this.clickSkip();
                await this.clickSkip();
                let regPage = new registerPage(this.Page);
                await (await this.Page).waitForSelector('text=Your Contact Details')
                await (await regPage.bookingRegistration())
                await (await this.nextBtn())?.click()
                await (await this.Page).fill('[placeholder="Password"]', 'password')
                await (await this.Page).fill('[placeholder="Re-enter Password"]', 'password')
                await (await this.Page).click('text=Create Account')
                await (await this.Page).click('data-test=Button')
                await (await this.nextBtn())?.click()
                if (this.Page.url().includes('staging')) {
                    await (this.Page.click('text=No Thanks'))
                }
                await (await this.doneBtn())?.click()
            }
        }


    }
}
