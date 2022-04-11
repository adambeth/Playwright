
async function createOffer(browser, baseURL, thread_id) {
    const context = await browser.newContext({
        storageState: "cookies/owner_cookie.json",
    });
    const cookieData = require('../cookies/renter_cookie.json')
    const today = new Date().toLocaleDateString('en-ca')
    const fdate = today.replace('/', '-')

    const _offerResponse = await context.request.post(`${baseURL}api/v4/trips/${thread_id}/offer/`, {
        data: {
            "currency": "ZAR",
            "subtotal": 200
        },
        headers: {
            'X-CSRFToken': cookieData.cookies[0].value
        },
    })
}
export default createOffer;


