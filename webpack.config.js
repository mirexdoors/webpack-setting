const path = require(`path`);
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: `development`,
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    publicPath: `http://localhost:8080`,
    hot: true
  },
  module: {
    rules: [
      {
        test: '/\.js/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'es2015']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ]
  }
};