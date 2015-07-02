module.exports = function(gulp, config) {
  require('harmonize')();

  var path = require('path'),
      fs = require('fs'),
      args   = require('yargs').argv,
      $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*', 'webpack*', 'open', 'del', 'wrench', 'jshint', 'lodash',
                  'extract-text-webpack-plugin', 'eslint-plugin-react', 'babel-eslint'],
        rename: {
          'webpack-dev-server': 'webpackDevServer',
          'gulp-util': 'gulpUtil',
          'gulp-react': 'gulpReact',
          'gulp-jshint': 'gulpJshint',
          'gulp-eslint': 'gulpEslint',
          'gulp-jscs': 'gulpJscs',
          'gulp-template': 'gulpTemplate',
          'gulp-scss-lint': 'gulpScssLint',
          'extract-text-webpack-plugin': 'extractTextWebpackPlugin'
        }
      }),
      root = path.resolve(process.cwd()),
      pkgPath = path.resolve(root, 'package.json'),
      pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')),
      build = args.build || '1',
      baseConfig = $.lodash.defaults(config || {}, {
        baseDir: root,
        contentBase: path.resolve(root, 'app'),
        toolingBase: path.resolve(__dirname),
        entryPoint: path.resolve(root, pkg.main),
        entryPointRelative: './' + pkg.main,
        serverPort: '8080',
        publicPath: 'http://localhost:8080',
        CSSDestinationFolder: path.resolve(root, './dist/' + build + '/styles'),
        output: path.resolve(root, './dist/' + build),
        developmentMode: true
      });

  if(baseConfig.developmentMode == true) {
    process.env.NODE_ENV = '__DEV__';
  } else {
    process.env.NODE_ENV = '__PRODUCTION__';
  }

  //Require() all files in the gulp-tasks directory
  $.wrench.readdirSyncRecursive(path.resolve(__dirname, './gulp-tasks')).filter(function(file) {
    return (/\.(js)$/i).test(file);
  }).map(function(file) {
    require(path.resolve(__dirname, './gulp-tasks/' + file))(gulp, $, baseConfig);
  });

  //Require() all files in the gulp-tasks directory
  if (fs.existsSync(path.resolve(root, './gulp-tasks'))) {
    $.wrench.readdirSyncRecursive(path.resolve(root, './gulp-tasks')).filter(function(file) {
      return (/\.(js)$/i).test(file);
    }).map(function(file) {
      require(path.resolve(root, './gulp-tasks/' + file))(gulp, $, baseConfig);
    });
  }

  gulp.task('default', ['webpack-dev-server']);
  gulp.task('build', ['copy', 'webpack:prod']);
};
