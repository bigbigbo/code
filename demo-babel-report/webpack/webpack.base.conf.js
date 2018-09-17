const fs = require('fs');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

// utils
const paths = require('./paths');

// 入口
const DEFAULT_ENTRY_GLOB = './src/pages/*/index.{js,ts}';
const DEFAULT_HTML_GLOB = './src/pages/*/index.{html,ejs}';
const mainjss = glob.sync(DEFAULT_ENTRY_GLOB, paths.appDirectory);
const htmls = glob.sync(DEFAULT_HTML_GLOB, paths.appDirectory);
const entrys = mainjss.reduce((memo, filePath, index) => {
  const key = filePath.split('/')[3] || `page_${index}`; // eslint-disable-line

  memo[key] = paths.resolveApp(filePath); // eslint-disable-line
  return memo;
}, {});

// 注入到html的loading样式
const loading = {
  html: fs.readFileSync(path.join(__dirname, './loading/index.html')),
  css: `<style type="text/css">${fs.readFileSync(path.join(__dirname, './loading/index.css'))}</style>`
};

const htmlPlugins = htmls.map((filePath, index) => {
  const pageName = filePath.split('/')[3] || `page_${index}`;
  const filename = `${pageName}.html`;

  return new HtmlWebpackPlugin({
    filename,
    template: paths.resolveApp(filePath),
    inject: true,
    chunks: [pageName, 'commons', 'vendors', 'polyfills', 'runtime'],
    loading
  });
});

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    polyfills: require.resolve('./polyfills'),
    ...entrys
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.NamedChunksPlugin(),
    new webpack.NamedModulesPlugin(),
    ...htmlPlugins,
    new ScriptExtHtmlWebpackPlugin({
      inline: /runtime\..*\.js$/
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  resolve: {
    modules: [paths.appNodeModules, 'node_modules'],
    extensions: [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      '.js',
      '.json',
      '.jsx',
      '.ts',
      '.tsx',
      '.less',
      '.scss',
      '.css'
    ],
    alias: {
      '@': paths.resolveApp('./src')
    }
  },
  resolveLoader: {
    modules: [paths.appNodeModules, 'node_modules'],
    moduleExtensions: ['-loader']
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
