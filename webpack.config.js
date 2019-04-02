const path = require(`path`);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: `production`,
  entry: `./src/index.js`,
  output: {
    filename: `[name].js`,
    path: path.join(__dirname, `public`)
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
    },
  },
  plugins: [
    ...['index','catalog'].map((event) => {
      return new HtmlWebpackPlugin({
        template: `./src/${event}.html`,
        filename: `${event}.html`,
      })
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    })
  ],
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    publicPath: `http://localhost:8080`,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            limit:150,  //it's important
            outputPath: 'img',
            publicPath: '../img',
          }
        }
      },
    ]
  }
};