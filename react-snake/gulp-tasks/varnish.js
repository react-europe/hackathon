var args   = require('yargs').argv;

module.exports = function(gulp, $, config) {
  gulp.task('varnish', function() {
    if (args.build && args.template) {
      gulp.src('templates/' + args.template)
        .pipe($.gulpTemplate({build: args.build}))
        .pipe(gulp.dest('varnish/test_videoland'));
    } else {
      console.log('build and template need to be specified')
    }
  });
};
