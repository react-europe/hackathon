var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('js', function() {
  return gulp.src([
      './public/js/jquery.min.js',
      './public/js/vivus.min.js',
      './public/js/app.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/lib'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/lib'));
});

gulp.task('build', function() {
  browserify({
    entries: './client/react/app.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  gulp.src('./public/sass/screen.scss')
    .pipe(sass({
      includePaths: require('node-neat').includePaths
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
  gulp.watch('client/react/*.jsx', ['build']);
  gulp.watch('public/sass/screen.scss', ['sass']);
});

gulp.task('default', ['build', 'sass']);
