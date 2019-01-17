const merge = require('webpack-merge')
const config = require('./webpack.config.js')

module.exports = merge(config, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    // proxy: {
    //   '/lambda': {
    //     target: 'http://144.34.208.247:8080'
    //   }
    // },
    port: 3333
  }
})