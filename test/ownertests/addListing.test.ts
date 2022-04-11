import { expect } from "@playwright/test"
import {testOwner} from '../../fixtures'
import AddListingPage from '../../pages/addListingPage.po'



testOwner.describe("Home Page Test", async () => {


    testOwner("Boats: Add Listing", async ({ baseURL,page }) => {

        await page.goto(`${baseURL}boat/create`);
        const addListingPage = new AddListingPage(page);
        await addListingPage.addCompleteListing();
        await expect(page.locator('text=Your boat is now published, now share it with the world!')).toBeVisible();


       
    });
});