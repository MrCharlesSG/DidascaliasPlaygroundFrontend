const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // For the cyclops server
  devServer: {
    https: false,
    port: 3001,
  },

  productionSourceMap: true,
})
