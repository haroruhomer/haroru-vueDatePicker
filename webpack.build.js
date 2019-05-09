var WebpackStripLoader = require('strip-loader')
var devConfig = require('./webpack.config.js')
var webpack = require('webpack')
var version = process.env.VERSION || require('./package.json').version

var banner =
  'haroru-datepicker v' + version + '\n' +
  '(c) ' + new Date().getFullYear() + ' Harold Molina \n' +
  '@license MIT'

var stripLoader = {
 test: [/\.js$/, /\.es6$/],
 exclude: /node_modules/,
 loader: WebpackStripLoader.loader('console.log')
}
devConfig.module.loaders.push(stripLoader);
devConfig.entry = './src/index.js'
devConfig.output = {
  path:'./dist',
  filename:'haroru-depicker.js',
  library:'HaroruDatePicker',
  libraryTarget: 'umd'
}
devConfig.plugins = devConfig.plugins.concat([
  new webpack.BannerPlugin(banner)
])
module.exports = devConfig;
