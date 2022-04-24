import { request } from "@/network/request.js"
export function getLoginState(name, pwd) {
    return request({
        method: 'POST',
        url: '/login',
        params: {
            password: pwd + '',
            username: name
        }
    })
}
export function UserRegister(name, pwd) {
    return request({
        method: 'POST',
        url: '/register',
        params: {
            username: name,
            password: pwd
        }
    })
}