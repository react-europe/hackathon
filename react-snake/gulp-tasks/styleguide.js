var path =  require('path');

module.exports = function (gulp, $, config) {

  var styleguide = require('sc5-styleguide');
  var sass = require('gulp-ruby-sass');
  var outputPath = 'documentation';

  gulp.task('styleguide:generate', function() {

    return gulp.src(config.contentBase + '/**/*.scss')
      .pipe(styleguide.generate({
        title: 'Snake',
        server: true,
        rootPath: outputPath,
        overviewPath: 'README.md'
      }))
      .pipe(gulp.dest(outputPath));
  });

  gulp.task('styleguide:applystyles', function() {
    return sass(config.contentBase)
      .on('error', function (err) {
        console.error('Error!', err.message);
      })
      .pipe(styleguide.applyStyles())
      .pipe(gulp.dest(outputPath));
  });

  gulp.task('styleguide', ['scss-lint', 'styleguide:generate', 'styleguide:applystyles']);

  gulp.task('style-watch', ['styleguide'], function() {
    gulp.watch(['*.scss'], ['styleguide']);
  });
};
