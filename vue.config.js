//解决跨域问题
module.exports = {
    devServer: {
        proxy: 'http://localhost:8083'
    }
}