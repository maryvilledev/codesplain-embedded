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
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {useEslintrc: false, baseConfig: { extends: ['react-app']}}
      },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, use: ExtractTextPlugin.extract({
        use: 'css-loader'
      })
    }]
  },
  devServer: {
    contentBase: [path.join(__dirname, "public"), path.join(__dirname, "build")]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['API_URL', 'NODE_ENV']),
    new ExtractTextPlugin('codesplain.css'),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({minimize: true}) // call the uglify plugin
  );
}
