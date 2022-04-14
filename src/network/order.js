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