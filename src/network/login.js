import { request } from "@/network/request.js"
export function getLoginState() {
    return request({
        method: 'POST',
        url: '/login',
        params: {
            password: 12345678,
            username: 'zhang'
        }
    })
}