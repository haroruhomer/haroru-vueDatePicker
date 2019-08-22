var path    = require('path');
var WebpackStripLoader = require('strip-loader')
var devConfig = require('./webpack.config.js')
var webpack = require('webpack')
var version = process.env.VERSION || require('./package.json').version

var banner =
  'haroru-vueDatePicker v' + version + '\n' +
  '(c) ' + new Date().getFullYear() + ' Harold Molina \n' +
  '@license MIT'

var stripLoader = {
 test: [/\.js$/, /\.es6$/],
 exclude: /node_modules/,
 use: WebpackStripLoader.loader('console.log')
}
devConfig.module.rules.push(stripLoader);
devConfig.entry = './src/index.js'
devConfig.output = {
  path:path.resolve(__dirname, 'dist'),
  filename:'haroru-datepicker.js',
  library:'HaroruDatePicker',
  libraryTarget: 'umd'
}
devConfig.plugins = devConfig.plugins.concat([
  new webpack.BannerPlugin(banner)
])
module.exports = devConfig;
