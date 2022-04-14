import { request } from "@/network/request.js"
export function getHomeCategoryList() {
    return request({
        url: '/admin/category/list',
        params: {
            pageNum: 1,
            pageSize: 10
        }
    })
}

export function getHomeProductList(id) {
    return request({
        url: '/product/list',
        params: {
            orderBy: 'price asc',
            categoryId: id,
            pageNum: 1,
            pageSize: 10
        }
    })
}
export function getGoodsListProductList() {
    return request({
        url: '/admin/product/list',
        params: {
            pageNum: 1,
            pageSize: 70
        }
    })
}