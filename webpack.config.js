const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  ],
  output: {
    filename: '[name][contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // optimization: {
  //   runtimeChunk: 'single',
  // },
};
