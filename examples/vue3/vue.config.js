const { defineConfig } = require('@vue/cli-service')
const StatisticsWebpackPlugin = require('../../src/index');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new StatisticsWebpackPlugin()]
  },
})
