import {expect } from "@playwright/test"
import {test} from '../../fixtures'
import signInPage from '../../pages/signInPage.po';
test.describe('Sign In Tests', () => {

    test('Authentication: Should show validation if no form data entered', async ({ browser, context, page, baseURL }) => {

        const spage = new signInPage(page)
        await page.goto(`${baseURL}s/auth/login/`);
        await spage.clickSignIn();
        expect(await page.isVisible('text=Please enter a password')).toBeTruthy()
        expect(await page.isVisible('text=Please enter an email address')).toBeTruthy()
    });

    test('Authentication: Should have the expected links', async ({ browser, context, page, baseURL }) => {

        await page.goto(`${baseURL}s/auth/login/`);
        const hrefForgot = await page.getAttribute('text="Forgot your password?"', 'href');
        const hrefPrivacy = await page.getAttribute('text="Privacy Policy"', 'href');
        const hrefTCs = await page.getAttribute('text="Terms of Service"', 'href');
        expect(hrefForgot).toBe(`/s/auth/password/forgot/`)
        expect(hrefPrivacy).toBe('https://policies.google.com/privacy')
        expect(hrefTCs).toBe('https://policies.google.com/terms')
    });

    test('Authentication: Should go to forgot password page if link clicked', async ({ browser, context, page, baseURL }) => {

        await page.goto(`${baseURL}s/auth/login/`);
        const signPage = new signInPage(page)
        await signPage.clickForgotPassword();
        await expect(page.url()).toContain('s/auth/password/forgot/')
    });

});
