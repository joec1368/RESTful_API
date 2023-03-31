/* webpack.config.js ： Webpack 的設定檔 */
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');


module.exports = {
  mode : 'development',
  target: 'node',
  plugins: [new webpack.IgnorePlugin({resourceRegExp: /\.\/native/, contextRegExp: /\/pg\// })],
  externals: [nodeExternals()],
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: { // 設定你的檔案選項
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
