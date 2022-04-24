import { request } from "@/network/request.js"
export function getHomeCategoryList() {
    return request({
        url: '/category/list'
    })
}
export function getHomeProductList(id) {
    return request({
        url: '/product/list',
        params: {
            orderBy: 'price asc',
            categoryId: id,
            pageNum: 1,
            pageSize: 5
        }
    })
}

export function getSeacrhProductList(key) {
    return request({
        url: '/product/list',
        params: {
            orderBy: 'price asc',
            keyword: key,
            pageNum: 1,
            pageSize: 50
        }
    })
}
export function getSeacrhProductListById(key, id) {
    return request({
        url: '/product/list',
        params: {
            orderBy: 'price asc',
            keyword: key,
            categoryId: id,
            pageNum: 1,
            pageSize: 50
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