var path    = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  devtool: 'source-map',
	entry:'./demo/main.js',
	output:{
		path:path.resolve(__dirname, 'static'),
    publicPath : '/static/',
		filename:'bundle.js'
	},
	plugins : [
    new webpack.ProvidePlugin({
      Promise : 'es6-promise'
    })
  ],
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
    new VueLoaderPlugin()
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
