const { defineConfig } = require('@vue/cli-service')
const registerRouter = require('./backend/router')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        // mixin 和 variable 没有实体的css，只是一定规则，不需要在局部引入
        // 全局引入变量和 mixin
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  /*
    启动node server
  */
  devServer: {
    // 踩了大坑 原因是WebPack4.0后before方法被弃用，替换成onBeforeSetupMiddleware
    // before(app){
    //   registerRouter(app)
    // }
    onBeforeSetupMiddleware(devServer) {
      registerRouter(devServer.app)
    }
}

})
