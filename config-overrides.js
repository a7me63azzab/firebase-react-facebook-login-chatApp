const { injectBabelPlugin } = require('react-app-rewired');
const rewireCssModules = require('react-app-rewire-css-modules');

module.exports = function override(config, env) {
    // do stuff with the webpack config...
    config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
    config = rewireCssModules(config, env);
    
    return config;
  };