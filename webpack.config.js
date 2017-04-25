var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'codesplain.js',
    path: __dirname + '/build'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {useEslintrc: false, baseConfig: { extends: ['react-app']}}
      },
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
    new ExtractTextPlugin('codesplain.css'),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
}
