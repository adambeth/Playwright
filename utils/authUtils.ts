import ownerCookies from '../cookies/owner_cookie.json'
import renterCookies from '../cookies/renter_cookie.json'
import { fetch } from 'node-fetch'
export function getOwnerToken(){

    var token = ownerCookies.cookies.filter(el => el.name =="csrftoken")
        var value =JSON.stringify(token);
        var newValue = value.replace('[',"")
        newValue = newValue.replace(']',"")
        var json = JSON.parse(newValue)
        return json.value

}

export function getRenterToken(){

    var token = renterCookies.cookies.filter(el => el.name =="csrftoken")
        var value =JSON.stringify(token);
        var newValue = value.replace('[',"")
        newValue = newValue.replace(']',"")
        var json = JSON.parse(newValue)
        return json.value

}


    