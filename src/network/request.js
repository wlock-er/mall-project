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