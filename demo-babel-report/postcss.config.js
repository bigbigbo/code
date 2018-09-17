/* eslint-disable no-unused-vars */
module.exports = ({ file, options, env }) => {
  const _plugins = [
    require('postcss-import')(),
    require('postcss-cssnext')({ warnForDuplicates: false }),
    require('autoprefixer')()
  ];
  if (env === 'production') {
    _plugins.push(require('cssnano'));
  }
  return {
    parser: file.extname === '.sss' ? 'sugarss' : false,
    exec: true,
    ident: 'postcss',
    plugins: _plugins
  };
};
