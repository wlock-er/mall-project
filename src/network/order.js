import { request } from "@/network/request.js"
export function getOrderList() {
    return request({
        url: '/order/list',
        params: {
            pageNum: 1,
            pageSize: 10
        }
    })
}
export function payOrder(no) {
    return request({
        method: 'POST',
        url: '/pay',
        params: {
            orderNo: no
        }
    })
}
export function cancelOrder(no) {
    return request({
        method: 'POST',
        url: '/order/cancel',
        params: {
            orderNo: no
        }
    })
}


export function getUserDtail() {
    return request({
        url: '/user/detail'
    })
}

export function updateSign(e) {
    return request({
        method: 'POST',
        url: '/user/update',
        params: {
            personalizedSignature: e
        }
    })
}
export function updatePhone(e) {
    return request({
        method: 'POST',
        url: '/user/update',
        params: {
            phone: e
        }
    })
}
export function updateEamil(e) {
    return request({
        method: 'POST',
        url: '/user/update',
        params: {
            mail: e
        }
    })
}
export function updateAddress(e) {
    return request({
        method: 'POST',
        url: '/user/update',
        params: {
            address: e
        }
    })
}
export function updateImage(e) {
    return request({
        method: 'POST',
        url: '/user/update',
        params: {
            images: e
        }
    })
}