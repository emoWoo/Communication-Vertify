const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    port: 8080, // 或你想要的端口
    proxy: {
      '/api': {
        target: 'http://192.168.137.246:5000/', // 你后端服务的地址
        pathRewrite: { '^/api': '' } // 如果你的后端没有 /api 前缀，可以启用这个
      }
    }
  }
})
