const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    compress: true,
    port: 3000,
    hot: true,
    client: {
      progress: true,
    },
    open: {
      app: {
        name: 'google-chrome',
        arguments: '--new-window',
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Sorting Visualizer',
      template: 'src/template.html',
    }),
  new MiniCssExtractPlugin()],
  output: {
    filename: '[name][contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  module: {
    rules: [
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.(png|jpg|gif)$/i, type: 'asset/resource'},
      { test: /\.svg/, type: 'asset/inline'},
    ],
  },
  // optimization: {
  //   runtimeChunk: 'single',
  // },
};
