import { expect } from "@playwright/test"
import {test} from '../../fixtures'
import HomePage from '../../pages/homePage.po';
import SearchResultPage from '../../pages/searchResult.po'



test.describe("Home Page Test", async () => {

    test("Home Page: Page has social media links", async ({ baseURL,page}) => {

        await page.goto(baseURL);
        await page.locator('data-test=FacebookSocialMediaLink').scrollIntoViewIfNeeded();
        const facebook = await page.isVisible('data-test=FacebookSocialMediaLink')
        const twitter = await page.isVisible('data-test=TwitterSocialMediaLink')
        const insta = await page.isVisible('data-test=InstagramSocialMediaLink')
        const pin = await page.isVisible('data-test=PinterestSocialMediaLink')
        const link = await page.isVisible('data-test=LinkedInSocialMediaLink')
        const youtube = await page.isVisible('data-test=YouTubeSocialMediaLink')
        expect(facebook).toBeTruthy()
        expect(twitter).toBeTruthy()
        expect(insta).toBeTruthy()
        expect(pin).toBeTruthy()
        expect(link).toBeTruthy()
        expect(youtube).toBeTruthy()

    });

    test("Home Page: Search With Capacity Filter", async ({ baseURL,page}) => {

        await page.goto(baseURL);
        const homePage = new HomePage(page);
        await homePage.search('Miami','Miami, FL, USA')
        const searchResultPage = new SearchResultPage(page)
        await (await searchResultPage.groupSizeFilter()).click();
        await (await searchResultPage.increaseBtn()).click();
        await page.waitForEvent('load');
        await expect(page.url()).toContain('capacity=1')
        await (await searchResultPage.increaseBtn()).click();
        await page.waitForTimeout(1000)
        await expect(page.url()).toContain('capacity=2')
        await (await searchResultPage.increaseBtn()).click();
        await page.waitForTimeout(1000)
        await expect(page.url()).toContain('capacity=3')
        await (await searchResultPage.increaseBtn()).click();
        await page.waitForTimeout(1000)
        await expect(page.url()).toContain('capacity=4')
        
        
    });
});