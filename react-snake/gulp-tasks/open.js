module.exports = function(gulp, $, config) {
  gulp.task('open', function () {
    require('open')(config.publicPath);
  });
};
