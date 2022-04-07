import { request } from "@/network/request.js"
export function getCartList() {
    return request({
        url: '/cart/list'
    })
}
export function setCartaddProduct(productId, count) {
    return request({
        method: 'POST',
        url: '/cart/add',
        params: {
            productId,
            count
        }
    })
}
export function setCartupdateProduct(productId, count) {
    return request({
        method: 'POST',
        url: '/cart/update',
        params: {
            productId,
            count
        }
    })
}
export function setCartdeleteProduct(productId) {
    return request({
        method: 'POST',
        url: '/cart/delete',
        params: {
            productId
        }
    })
}