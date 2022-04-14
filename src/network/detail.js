import { request } from "@/network/request.js"
export function getProductDetail(id) {
    return request({
        url: '/product/detail',
        params: {
            id
        }
    })
}
export function addProductInCart(id, count) {
    return request({
        method: 'POST',
        url: '/cart/add',
        params: {
            productId: id,
            count
        }
    })
}