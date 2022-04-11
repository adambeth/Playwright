import { test, expect } from "@playwright/test"
import { testRenter } from '../../fixtures'
import HomePage from '../../pages/homePage.po';
import BookingsPage from '../../pages/bookingsPage.po';


test.describe("Booking Tests", async () => {

    testRenter("Bookings: Logged In with Captain", async ({ baseURL, page }) => {

        await page.goto(baseURL);
        const homepage = new HomePage(page);
        await  homepage.search('Boston', 'Boston, MA, USA')
        const bookP= new BookingsPage(page)
        await bookP.completeBooking({});
        // check navigation happened to the inbox 
        const navUrl =await page.url();
        await expect(navUrl.includes('inbox')).toBeTruthy()
        
    });

    testRenter("Bookings: Logged in booking No Captain", async ({ baseURL, page }) => {

        await page.goto(baseURL);
        const homepage = new HomePage(page);
        await  homepage.search('Boston', 'Boston, MA, USA')
        const bookP= new BookingsPage(page)
        await bookP.completeBooking({
            needsCaptain: false
        });
        // check navigation happened to the inbox
        const navUrl = await page.url();
        await expect(navUrl.includes('inbox')).toBeTruthy()
        
    });

});