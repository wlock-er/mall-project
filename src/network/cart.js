import { request } from "@/network/request.js"
export function getCartList() {
    return request({
        url: '/cart/list'
    })
}
export function setCartaddProduct() {
    return request({
        method: 'POST',
        url: '/cart/add',
        data: {
            productld: 5,
            count: 1
        }
    })
}