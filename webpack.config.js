module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'codesplain.js',
    path: __dirname + '/build'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
