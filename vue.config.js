const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // For the cyclops server
  devServer: {
    https: true,
    port: 443,
  },

  productionSourceMap: true,
})
