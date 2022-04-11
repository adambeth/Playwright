import { test } from '../../fixtures'
import registerPage from '../../pages/registerPage.po';
// declare const context:BrowserContext;
test.describe("Register New User", async () => {
    test("Registration: Validate user is able to Register/Create account", async ({  baseURL,page }) => {

        await page.goto(`${baseURL}s/auth/register/`);
        const regPage = new registerPage(page);
        await regPage.registerUser()
        await regPage.clickCreateAccount()
        await page.waitForLoadState('load')
        await regPage.clickAccept()
        await page.waitForNavigation({
            url: baseURL
        })
    });

});
