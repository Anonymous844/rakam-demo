const merge = require('webpack-merge')
const config = require('./webpack.config.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(config, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['./app'], {allowExternal: true}),
    new UglifyJsPlugin({
      parallel: 4,
      sourceMap: true
    })
  ]
})