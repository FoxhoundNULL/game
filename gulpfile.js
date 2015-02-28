'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');


var reload = browserSync.reload;

var compileAndConcatCss = function () {
  console.log('compiling');
  // compile sass to css
  gulp.src('app/styles/**/*.scss')
    .pipe(sass()) // compile to css
    .pipe(concatCss('main.css')) // concat css, set output filename
    .pipe(gulp.dest('app/styles/')); // where to put it
};

var startServer = function () {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });
};

// watch files for changes and reload
gulp.task('serve', function() {

  compileAndConcatCss();

  startServer();

  gulp.watch(['styles/**/*.scss'], {cwd: 'app'}, compileAndConcatCss);
  gulp.watch(['*.html', 'styles/main.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});
