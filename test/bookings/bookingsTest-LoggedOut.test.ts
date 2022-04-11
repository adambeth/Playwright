import { expect } from "@playwright/test"
import {test} from '../../fixtures'
import HomePage from '../../pages/homePage.po';
import BookingsPage from '../../pages/bookingsPage.po';


test.describe("Booking Tests", async () => {

    test("Bookings: Logged Out with Captain", async ({ baseURL ,page, }) => {

        await page.goto(baseURL);
        const homepage = new HomePage(page);
        await  homepage.search('Boston', 'Boston, MA, USA')
        const bookP= new BookingsPage(page)
        await bookP.completeBooking({isSignedIn:false});
        // check navigation happened to the inbox
        const navUrl = await page.url();
        await expect(navUrl.includes('inbox')).toBeTruthy()

        
    });

    test("Bookings: Logged Out without Captain", async ({ baseURL, page }) => {

        await page.goto(baseURL);
        const homepage = new HomePage(page);
        await  homepage.search('Boston', 'Boston, MA, USA')
        const bookP= new BookingsPage(page)
        await bookP.completeBooking({isSignedIn:false, needsCaptain:false});
        // check navigation happened to the inbox
        const navUrl = await page.url();
        await expect(navUrl.includes('inbox')).toBeTruthy()

    });

});