var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');

var reload = browserSync.reload;

// watch files for changes and reload
gulp.task('serve', function() {

  // compile sass to css
  gulp.src('app/styles/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));

  // concatenate css
  gulp.src('dist/css/**/*.css')
    .pipe(concatCss("main.css")) // output filename
    .pipe(gulp.dest('app/styles/')); // where to put it


  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});
