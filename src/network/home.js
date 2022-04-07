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
export function getHomeProductDetail(id) {
    return request({
        url: '/product/detail',
        params: {
            id
        }
    })
}
export function getHomeProductList() {
    return request({
        url: '/product/list',
        params: {
            orderBy: 'price asc',
            categoryId: 3,
            keyword: '桃',
            pageNum: 1,
            pageSize: 10
        }
    })
}