module.exports = function(gulp, $, config) {
  gulp.task('lint', function() {
    gulp.src([config.contentBase + '/**/*.js', config.contentBase + '/**/*.jsx'])
      .pipe($.plumber())
      .pipe($.gulpEslint({
      	configFile: __dirname + '/eslintconf.json',
      }))
      .pipe($.gulpEslint.format().on('data', function () {}));
  });
};
