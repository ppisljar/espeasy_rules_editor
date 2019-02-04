'use strict';

var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify-es').default;
var inlinesource = require('gulp-inline-source');
var gutil = require('gulp-util');

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // Gulp task to minify CSS files
gulp.task('styles', function () {
    return gulp.src('./src/styles.css')
      // Auto-prefix css styles for cross browser compatibility
      //.pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      // Minify the file
      .pipe(csso())
      // Output
      .pipe(gulp.dest('./dist'))
  });

// Gulp task to minify JavaScript files
gulp.task('scripts', function() {
    return gulp.src('./src/*.js')
      // Minify the file
      .pipe(uglify())
      .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })

      // Output
      .pipe(gulp.dest('./dist'))
  });

// Gulp task to minify HTML files
gulp.task('pages', function() {
    return gulp.src(['./src/editor.htm'])
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
      .pipe(gulp.dest('./dist'));
  });

gulp.task('pagesinline', function() {
    return gulp.src(['./src/editor.htm'])
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
      .pipe(inlinesource())
      .pipe(gulp.dest('./dist/editor_inline.htm'));
  });

// Clean output directory
gulp.task('clean', () => del(['dist']));

// Gulp task to minify all files
gulp.task('default', ['clean'], function () {
  runSequence(
    'styles',
    'scripts',
    'pages',
    'pagesinline'
  );
});