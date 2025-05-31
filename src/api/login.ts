import request from "../utils/request"

export function accountLoginRequest(account:any){
    return request({
        url:'/login',
        method:'get',
        data:account 
    })
}