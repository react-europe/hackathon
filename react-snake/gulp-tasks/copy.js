module.exports = function (gulp, $, config) {
  gulp.task('copy', ['copyHtml', 'copyImages', 'copyStubData', 'copyCheck']);

  gulp.task('copyHtml', function () {
    gulp.src([config.contentBase + '/index-prod.html'])
      .pipe($.plumber())
      .pipe($.rename('index.html'))
      .pipe(gulp.dest(config.output))
  });

  gulp.task('copyImages', function () {
    gulp.src([config.contentBase + '/assets/images/**/*'])
      .pipe($.plumber())
      .pipe(gulp.dest(config.output + '/assets/images'))
  });

  gulp.task('copyStubData', function () {
    gulp.src([config.contentBase + '/stubdata/**/*'])
      .pipe($.plumber())
      .pipe(gulp.dest(config.output + '/stubdata'))
  });

  gulp.task('copyCheck', function () {
    gulp.src([config.contentBase + '/check.txt'])
      .pipe($.plumber())
      .pipe(gulp.dest(config.output))
  });
};
