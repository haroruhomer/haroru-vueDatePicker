var path    = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  devtool: 'source-map',
	entry:'./demo/main.js',
	output:{
		path:path.resolve(__dirname, 'static'),
    publicPath : '/static/',
		filename:'bundle.js'
	},
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'src' : path.resolve(__dirname, './src'),
      'dist' : path.resolve(__dirname, './dist')
    }
  },
	module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use: {
          loader: 'babel-loader',
          options : {
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test:/\.vue$/,
        use:'vue-loader'
      },{
        test:/\.scss$/,
        loader:'style-loader!css-loader!sass-loader'
      },
      {
        test:/\.css$/,
        loader:'style-loader!css-loader'
      }
    ]
  },
  plugins : [
    new VueLoaderPlugin(),
    new MomentLocalesPlugin({
      localesToKeep: ['es', 'fr', 'de', 'it'],
    }),
    new BundleAnalyzerPlugin({
		  openAnalyzer:  true, //para que nos muestre el resultado inmediatamente
    })
  ],
  devServer: {
    port : 8070,
    historyApiFallback: true,
    stats : {
      colors : true,
      chunks : false
    }
  }
};
