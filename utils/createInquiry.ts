
async function  createInq( browser,baseURL) {
    const context = await browser.newContext({
        storageState: "cookies/renter_cookie.json",
    });
    const cookieData = require('../cookies/renter_cookie.json')
    const today = new Date().toLocaleDateString('en-ca')
    const fdate = today.replace('/','-')

    const _inquiryResponse = await context.request.post(`${baseURL}api/v4/inquiries/`, {
        data: {
            "trip_length": "PT2H",
            "seniors": 0,
            "preferred_date1": fdate,
            "infants": 0,
            "adults": 4,
            "captain_required": true,
            "children": 0,
            "boat": "vA8klJ7m"
        },
        headers: {
            'X-CSRFToken': cookieData.cookies[0].value
        },

    })
    return _inquiryResponse
}
export default createInq;


