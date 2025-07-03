import request from "../utils/request"

export function getUserId(imgurl:string){
    return request({
        url:'/getUserId',
        method:'get',
        params: { imgurl } 
    })
}