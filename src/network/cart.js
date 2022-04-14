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
export function createOrder() {
    return request({
        method: 'POST',
        url: '/order/create',
        params: {
            receiverName: "小慕",
            receiverMobile: "18888888888",
            receiverAddress: "中国慕城"
        }
    })
}
export function selectItorNot(productId, selected) {
    return request({
        method: 'POST',
        url: '/cart/select',
        params: {
            productId,
            selected
        }
    })
}
export function selectAllItorNot(selected) {
    return request({
        method: 'POST',
        url: '/cart/selectAll',
        params: {
            selected
        }
    })
}