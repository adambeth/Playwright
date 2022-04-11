import { test, testOwner } from "../../fixtures";
import registerPage from "../../pages/registerPage.po";
import createInq from "../../utils/createInquiry";
import createOffer from "../../utils/createOffer";
import Calendar from "../../pages/calendar.po";

const today = new Date();
const tomorrow = today.getDate();
const todayDate = today.toLocaleDateString("en-ca");
const tomorrowDate = todayDate.replace(
  today.getDate().toString(),
  tomorrow.toString()
);
const formattedDate = tomorrowDate.replace("/", "-");

test.describe("Calendar Tests", async () => {
  testOwner.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}calendar`);
  });

  testOwner.beforeAll(async ({ browser, baseURL }) => {
    const _inquiryResponse = await createInq(browser, baseURL);
    const _inquiryResponseOffer = await createInq(
      browser,
      baseURL,

    );
    const bookingResponse = await JSON.parse(
      await _inquiryResponseOffer.text()
    );

    const thread_id = bookingResponse.thread_id;
    await createOffer(browser, baseURL, thread_id);
  });

  testOwner.skip("Calendar: Inquiry Filter", async ({ page }) => {
    const calendarPage = new Calendar(page);
    await page
      .locator("button", { hasText: tomorrow.toString() })
      .click();
    await calendarPage.clickFilters();
  });
});