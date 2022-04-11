import {  expect } from '@playwright/test'
import { testOwner,testRenter} from '../../fixtures'
import createInq from '../../utils/createInquiry'
import OwnerInboxPage from '../../pages/ownerInbox.po'
import InquirySentPage from '../../pages/inquirySentPage.po'
import InboxMessagePage from '../../pages/inboxMessagePage.po'
import createOffer from '../../utils/createOffer'
import RenterInboxPage from '../../pages/renterInboxPage.po'
import OfferSentPage from '../../pages/offerSent.po'




testOwner.describe('Inbox Tests', async () => {

    testOwner('Inbox: Inquiry Shows in Onwers Inbox', async ({ browser, context, baseURL,page }) => {

        const _inquiryResponse = await createInq(browser,baseURL)
        const bookingResponse = await JSON.parse(await _inquiryResponse.text())
        const thread_id = bookingResponse.thread_id

        await page.goto(`${baseURL}inbox/${thread_id}/`);
        await page.waitForLoadState('load');
        await expect(page.locator('text=sent you a booking inquiry. Please review the requested trip details and send an offer to respond.')).toBeVisible();
    });

    testOwner('Inbox: Owner Create Offer From Inbox', async ({ browser, context, baseURL,page }) => {

        const _inquiryResponse = await createInq(browser,baseURL)
        const bookingResponse = await JSON.parse(await _inquiryResponse.text())
        const thread_id = bookingResponse.thread_id
        await page.goto(`${baseURL}inbox/${thread_id}/`);
        await page.waitForURL(`${baseURL}inbox/${thread_id}/`)
        await page.waitForLoadState('load');
        await expect(await page.locator('text=sent you a booking inquiry. Please review the requested trip details and send an offer to respond.')).toBeVisible();
        const ownerInboxPage = new OwnerInboxPage(page);
        await ownerInboxPage.createOffer();
        await expect(page.url()).toEqual(`${baseURL}inbox/${thread_id}/price/`)
        await page.waitForURL(`${baseURL}inbox/${thread_id}/`)
        await expect(await page.locator('text=Offer Sent').first()).toBeVisible();

    });

    testOwner('Inbox: Owner Create Offer with Custom Expiry From Inbox', async ({ browser, context, baseURL,page }) => {

        const _inquiryResponse = await createInq(browser,baseURL)
        const bookingResponse = await JSON.parse(await _inquiryResponse.text())
        const thread_id = bookingResponse.thread_id
        await page.goto(`${baseURL}inbox/${thread_id}/`);
        await page.waitForURL(`${baseURL}inbox/${thread_id}/`)
        await page.waitForLoadState('load');
        await expect(await page.locator('text=sent you a booking inquiry. Please review the requested trip details and send an offer to respond.')).toBeVisible();
        const ownerInboxPage = new OwnerInboxPage(page);
        await ownerInboxPage.createCustomOfferExpiry();
        await expect(page.url()).toEqual(`${baseURL}inbox/${thread_id}/price/`)
        await page.waitForURL(`${baseURL}inbox/${thread_id}/`)
        await expect(await page.locator('text=Offer Sent').first()).toBeVisible();

    });
    testRenter('Inbox: Inquiry Shows in Renter Inbox', async ({ browser, context, baseURL,page }) => {

        const _inquiryResponse = await createInq(browser,baseURL)
        const bookingResponse = await JSON.parse(await _inquiryResponse.text())
        const thread_id = bookingResponse.thread_id
        await page.goto(`${baseURL}inbox/${thread_id}/`);
        await page.waitForURL(`${baseURL}inbox/${thread_id}/`)
        await page.waitForLoadState('load');
        await expect(await page.locator('text=Owner will be prompted to get back to you soon.')).toBeVisible();
    });

    testRenter('Inbox: Renter Can Send a Message to the owner before offer sent', async ({ browser, context, baseURL,page }) => {



        const _inquiryResponse = await createInq(browser,baseURL);
        const bookingResponse = await JSON.parse(await _inquiryResponse.text());
        const thread_id = bookingResponse.thread_id;
        await page.goto(`${baseURL}inbox/${thread_id}/`);
        await page.waitForURL(`${baseURL}inbox/${thread_id}/`);
        await page.waitForLoadState('load');
        await expect(await page.locator('text=Owner will be prompted to get back to you soon.')).toBeVisible();
        const inquirySentPage = new InquirySentPage(page);
        await inquirySentPage.clickOptions();
        await (await inquirySentPage.sendMessageOption()).click();
        await page.waitForURL(`${baseURL}inbox/${thread_id}/messages/`);
        const messagePage = new InboxMessagePage(page);
        await messagePage.sendMessage();
        await expect( page.locator("text=Im on a boat MF").first()).toBeVisible({}); 
    });
    testRenter('Inbox: Offer Displays in Renters Inbox', async ({ browser, context, baseURL,page }) => {

        const _inquiryResponse = await createInq(browser,baseURL);
        const bookingResponse = await JSON.parse(await _inquiryResponse.text());
        const thread_id = bookingResponse.thread_id;
        await createOffer(browser,baseURL,thread_id);
        await page.goto(`${baseURL}inbox/${thread_id}/`);
        await page.waitForLoadState('load');
        const renterInboxPage = new RenterInboxPage(page);
        await expect(page.locator('text=Owner sent you an offer for your trip.  Book now to confirm your trip, or send a message if you have more questions.')) .toBeVisible({});
        
    });
    testRenter('Inbox: Renter Can Cancel Inquiry w/o Message', async ({ browser, context, baseURL,page }) => {



        const _inquiryResponse = await createInq(browser,baseURL);
        const bookingResponse = await JSON.parse(await _inquiryResponse.text());
        const thread_id = bookingResponse.thread_id;
        await page.goto(`${baseURL}inbox/${thread_id}/`);
        await page.waitForURL(`${baseURL}inbox/${thread_id}/`);
        await page.waitForLoadState('load');
        await expect(await page.locator('text=Owner will be prompted to get back to you soon.')).toBeVisible();
        const inquirySentPage = new InquirySentPage(page);
        await inquirySentPage.clickOptions();
        await (await inquirySentPage.cancelInquiryOption()).click();
        await (await inquirySentPage.cancelInquiryBtn()).click();
        await page.waitForURL(`${baseURL}inbox/${thread_id}/`);
        const messagePage = new InboxMessagePage(page);
        await expect( page.locator("text=You cancelled your booking inquiry with Owner.").first()).toBeVisible({
            timeout: 10000
        }); 
    });


    testRenter('Inbox: Renter can Cancel Offer', async ({ browser, context, baseURL,page }) => {

        const _inquiryResponse = await createInq(browser,baseURL);
        const bookingResponse = await JSON.parse(await _inquiryResponse.text());
        const thread_id = bookingResponse.thread_id;
        await createOffer(browser,baseURL,thread_id);
        await page.goto(`${baseURL}inbox/${thread_id}/`);
        await page.waitForLoadState('load');
        const offerSentPage = new OfferSentPage(page);
        await expect.soft(page.locator('text=Owner sent you an offer for your trip.  Book now to confirm your trip, or send a message if you have more questions.')) .toBeVisible({});
        await (await offerSentPage.clickOptions());
        await (await offerSentPage.cancelInquiryOption()).click();
        await (await offerSentPage.cancelInquiryBtn()).click();
        await expect(page.locator('text=You cancelled your booking inquiry with Owner. ')).toBeVisible();
        

        
        
    });

    testRenter('Inbox: Renter can accept Offer and pay', async ({ browser, context, baseURL,page },testInfo) => {

        const _inquiryResponse = await createInq(browser,baseURL);
        const bookingResponse = await JSON.parse(await _inquiryResponse.text());
        const thread_id = bookingResponse.thread_id;
        await createOffer(browser,baseURL,thread_id);
        await page.goto(`${baseURL}inbox/${thread_id}/`);
        await page.waitForLoadState('load');
        const renterInboxPage = new RenterInboxPage(page);
        await expect.soft(page.locator('text=Owner sent you an offer for your trip.  Book now to confirm your trip, or send a message if you have more questions.')) .toBeVisible({});
        await (await renterInboxPage.bookNowBtn()).click();
        await page.waitForTimeout(1000);
        await (await renterInboxPage.proceedToPaymentBtn()).click();
        await page.waitForTimeout(1000);
        await (await page.locator('[data-testid="hosted-payment-submit-button"]')).click();
        await (await page.locator('button',{hasText:'No'})).click();
        await expect(page.locator('text=Booking Confirmed')).toBeVisible();

        
        
    });

});