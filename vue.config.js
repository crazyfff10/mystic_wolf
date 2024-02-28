const { defineConfig } = require('@vue/cli-service');
const { VantResolver } = require('unplugin-vue-components/resolvers');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack').default({ resolvers: [VantResolver()]}),
    ],
  },
});