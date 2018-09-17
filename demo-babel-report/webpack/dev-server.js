/* eslint-disable new-cap */
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const paths = require('./paths');

// const isInteractive = process.stdout.isTTY;
const devWebpackConfig = require('./webpack.dev.conf');

const options = {
  contentBase: paths.appPublic,
  publicPath: '/',
  host: 'localhost',
  hot: true,
  compress: true,
  clientLogLevel: 'none'
};

webpackDevServer.addDevServerEntrypoints(devWebpackConfig, options);
const compiler = webpack(devWebpackConfig);

const server = new webpackDevServer(compiler, options);

server.listen(5001, 'localhost', () => {
  console.log('dev server listening on port 5001');
});
