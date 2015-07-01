var gulp = require('gulp');
var reactify = require('reactify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var del = require('del');
var pkg = require('./package.json');

var paths = {
  main: "./" + pkg.main,
  js: ['app/js/**/*.js'],
  statics: ['app/images', 'app/styles/**/*.*', 'app/index.html'],
  dist: './dist'
};

var config = {
  browserify: {
    entries: [paths.main],
    debug: true,
    standalone: pkg.name,
    extensions: ['.jsx', '.js']
  }
};

gulp.task('clean', function(done) {
  del(['dist'], done);
});

gulp.task('copy', function() {
  gulp.src(paths.statics)
    .pipe(gulp.dest(paths.dist))
});

gulp.task('js', function() {
  browserify(config.browserify)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(paths.dist + "/js/"));
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.statics, ['copy']);
});

gulp.task('dist', ['js', 'copy']);

gulp.task('default', ['watch', 'dist']);
