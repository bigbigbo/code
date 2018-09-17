const webpack = require('webpack');
const merge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const paths = require('./paths');
const variables = require('../src/global/theme.js');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    libraryTarget: 'var',
    publicPath: '/',
    path: paths.appBuild,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].async.js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [paths.appSrc],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        include: [paths.appSrc],
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
              importLoaders: 1,
              namedExport: true,
              camelCase: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        include: [paths.appSrc],
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
              importLoaders: 1,
              namedExport: true,
              camelCase: true
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: variables
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          // 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: '[hash].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                optimizationLevel: 7
              },
              gifsicle: {
                interlaced: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                quality: 65,
                progressive: true
              }
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // use: 'url-loader?limit=10000&mimetype=application/font-woff',
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.WatchIgnorePlugin([/(c|le|sc)ss\.d\.ts$/])
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks(chunk) {
            return chunk.name !== 'polyfills';
          }
        },
        commons: {
          name: 'commons',
          chunks(chunk) {
            return chunk.name !== 'polyfills';
          },
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  }
});
