// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

//解决跨域问题
module.exports = {
    devServer: {
        proxy: 'http://localhost:8083'
    }
}