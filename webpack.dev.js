const merge = require('webpack-merge')
const config = require('./webpack.config.js')

module.exports = merge(config, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    port: 3333,
    historyApiFallback: true
  }
})