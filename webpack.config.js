const path = require(`path`);
const webpack = require(`webpack`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const OptimizeCSSAssetsPlugin = require(`optimize-css-assets-webpack-plugin`);
module.exports = (env, options) => {
  const isProd = options.mode === `production`;

  const finalCssLoader = isProd ? { loader: MiniCssExtractPlugin.loader} : `style-loader`

  const styleLoaders = [
    finalCssLoader,
    `css-loader`,
    `sass-loader`,
  ];

  const config = {
    entry: `./src/index.js`,
    output: {
      filename: `[name].js`,
      publicPath: ``,
      path: path.join(__dirname, `public`)
    },
    optimization: {
      splitChunks: {
        name: `vendor`,
        chunks: `all`,
      },
      minimizer: [new OptimizeCSSAssetsPlugin({})]
    },
    plugins: [
      ...[`index`,`catalog`].map((event) => {
        return new HtmlWebpackPlugin({
          template: `./src/${event}.html`,
          filename: `${event}.html`,
        })
      }),
      new MiniCssExtractPlugin({
        filename: `css/[name].css`,
      }),
    ],
    devtool: `source-map`,
    devServer: {
      contentBase: path.join(__dirname, `src`),
      watchContentBase: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: `babel-loader`
        },
        {
          test: /\.(css|scss)$/,
          use: styleLoaders 
        },
        {
          test: /\.(html)$/,
          use: {
            loader: `html-loader`,
            options: {
              minimize: true,
              attrs: [`:src`, `:data-src`]
            }
          }
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: {
            loader: `url-loader`,
            options: {
              name: `[name].[ext]`,
              limit: 9192,  //it`s important
              outputPath: `img`,
              publicPath: `../img`,
              mimetype: `image/jpg`,
            }
          }
        }
      ]
    }
  }

  if (!isProd) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  
  return config;
};