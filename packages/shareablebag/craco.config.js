const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');

const packages = [];
packages.push(path.join(__dirname, '../common'));

module.exports = {
  plugins: [
    {
      plugin: require('./craco-plugins/module-federation'),
    },
  ],
  webpack: {
    configure: (webpackConfig, arg) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName('babel-loader')
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];

        match.loader.include = include.concat(packages);
      }

      return webpackConfig;
    },
    plugins: {
      remove: ['ModuleScopePlugin'],
    },
  },
};
