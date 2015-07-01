var ReactTools = require('react-tools');
var babel = require("babel-core");

module.exports = {
  process: function(src, path) {
    if (path.match(/\.s?[ac]+ss$/)) {
      return '';
    }
    if (path.match(/\.s?[ac]+ss$/)) {
      return '';
    }
    if (path.match(/\.png$/)) {
      return '';
    }
    if (path.match(/\.svg$/)) {
      return '';
    }
    if (path.match(/\.jpg$/)) {
      return '';
    }
    if (path.match(/\.ico$/)) {
      return '';
    }

    //src = src.replace(/^import (.*) from '(.*)';$/g, "const $1 = require('$2');");
    // src = src.replace(/^exports default (.*)$/g, "module.exports = $1");
    // Allow the stage to be configured by an environment
    // variable, but use Babel's default stage (2) if
    // no environment variable is specified.
    var stage = process.env.BABEL_JEST_STAGE || 2;

    // Ignore all files within node_modules
    // babel files can be .js, .es, .jsx or .es6
    if (path.indexOf("node_modules") === -1 && babel.canCompile(path)
      || path.indexOf("components") !== -1 && path.indexOf("components/node_modules") === -1
      || path.indexOf("vl_core") !== -1 && path.indexOf("vl_core/node_modules") === -1
      || path.indexOf("vl_api") !== -1 && path.indexOf("vl_api/node_modules") === -1) {
      return babel.transform(src, { filename: path, stage: stage, retainLines: true, auxiliaryComment: 'istanbul ignore next' }).code;
    }

    return src;
  }
};
