import request from "../utils/request"

export function loginRequest(account:any){
    return request({
        url:'/login',
        method:'get',
        data:account 
    })
}

export function checkCodeRequest(){
    return request({
        url:'/account',
        method:'get', 
    })
}

export function registerRequest(){
    return request({
        url:'/account',
        method:'get', 
    })
}