import axios from 'axios'

export function request(config) {
    const instance = axios.create({
            baseURL: 'http://localhost:8080',
            timeout: 5000
        })
        //发送请求前
    instance.interceptors.request.use(config => {
            return config
        }), err => {
            // console.log(err);
        }
        // 响应数据
    instance.interceptors.response.use(res => {
        return res.data
    }), err => {
        console.log(err);
    }
    return instance(config)
}


// 使————也可以再封装一个函数
// import {request} from "@/network/request.js"
// clickbtn(){
//  request({
//     url: '/category/list',
//     // params: {
//     //     pageNum: 1,
//     //     pageSize: 10
//     // }
// }).then(res=>{
//     console.log(res.data);
// })
//      request({
//         method:'POST',
//         url: '/adminLogin',
//         data: {
//             userName: 'cfasvffver',
//             password: 12345678
//         }
//     }).then(res=>{
//         console.log(res.data);
//     })
// }