module.exports = function(gulp, $, config) {
  gulp.task('scss-lint', function() {
    gulp.src(config.contentBase + '/**/*.scss')
      .pipe($.plumber())
      .pipe($.gulpScssLint({
        'config': config.toolingBase + '/scss.yml',
        'reporterOutput': 'scssLintReport.json'
      }));
  });
};
