require('dotenv').config();
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack')
module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'codesplain.js',
    path: __dirname + '/build'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, use: ExtractTextPlugin.extract({
        use: 'css-loader'
      })
    }]
  },
  devServer: {
    contentBase: [path.join(__dirname, "public"), path.join(__dirname, "build")]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['API_URL']),
    new ExtractTextPlugin('codesplain.css'),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
}
