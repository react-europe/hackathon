var path =  require('path');
var args   = require('yargs').argv;

module.exports = function (gulp, $, config) {
  var jest = require('gulp-jest')
  var filter = args.filter ? '/' + args.filter + '/': '/';

  gulp.task('test', function () {
    return gulp.src(config.contentBase + filter).pipe(
      jest({
        scriptPreprocessor: config.toolingBase + '/jest-preprocessor.js',
        setupTestFrameworkScriptFile: config.toolingBase + '/jest-setup.js',
        collectCoverage: true,
        unmockedModulePathPatterns: [
          'babel-runtime',
          'node_modules/vl_core',
          'node_modules/vl_tooling'
        ],
        testPathIgnorePatterns: [
          "node_modules",
          "spec/support"
        ],
        testFileExtensions: [
          "js",
          "jsx"
        ],
        moduleFileExtensions: [
          "js",
          "jsx",
          "json"
        ]
      })
    );
  });
};
