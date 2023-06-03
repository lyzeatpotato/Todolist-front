const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

const path = require('path')
// const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: "statics",
  indexPath: "index.html",
  productionSourceMap: process.env.NODE_ENV !== 'production' ? false : true,
  /* webpack-dev-server 相关配置 */
  devServer: {
    /* 使用代理 */
    proxy: {
      '/api': {
        target: 'http://101.132.110.63:60017/',
        // target: 'http://localhost:60017/', 
        ws: true, // websockets
        changeOrigin: true,  // needed for virtual hosted sites
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    port: 6300,
    host: '0.0.0.0',
    https: false,
    open: true
  },
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
    externals: {
      'AMap': 'AMap'
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("src", resolve("src")) //给src的绝对路径起一个别名叫@.set("api", resolve("./src/api")) //aip文件夹绝对路径地址起一个别名叫api
  }
}
