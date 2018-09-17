const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
  appDirectory,
  appSrc: path.resolve(__dirname, '../src'),
  appNodeModules: path.resolve(__dirname, '../node_modules'),
  appBuild: path.resolve(__dirname, '../build'),
  appPublic: path.resolve(__dirname, '../public'),
  appPackageJson: path.resolve(__dirname, '../package.json'),
  appPostcssConfigJson: path.resolve(__dirname, '../postcss.config.js'),
  resolveApp: p => path.resolve(appDirectory, p)
};
