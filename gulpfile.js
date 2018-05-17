var gulp = require('gulp'),
  gutil = require('gulp-util'),
  cheerio = require('gulp-cheerio'),
  del = require('del'),
  zip = require('gulp-zip'),
  rename = require('gulp-rename'),
  fs = require('fs'),
  runSequence = require('run-sequence');

/**
 * Add a valid configuration file to the distribution
 */
gulp.task('profile', function () {
  var env = (gutil.env.env === undefined) ? 'development' : gutil.env.env;

  // Read the settings from the right file
  var filename = './env-config/' + env + '.json';
  console.log(filename);
  gulp.src(filename)
    .pipe(rename('config.json'))
    .pipe(gulp.dest('./dist/assets/config'));
});

gulp.task('compress', function () {
  return gulp.src('./dist/**/*')
    .pipe(zip('service-mobile.zip'))
    .pipe(gulp.dest('./dist'));
});

/**
 * Create a zip field with the content of the dist folder
 */
gulp.task('zip', function (callback) {
  runSequence('clean-dist', 'copy', 'profile', 'compress', callback);
});

/**
 * Copy all the required resources
 */
gulp.task('copy', ['copy-resources', 'copy-www']);

/**
 * Remove the content of the distribution folder
 */
gulp.task('clean-dist', function () {
  del('./dist/*');
});

/**
 * Copy the resources folder to the distribution
 */
gulp.task('copy-resources', ['splash-resources'], function () {
  return gulp.src('./resources/**/*', { base: "./" })
    .pipe(gulp.dest('./dist'));
});

/**
 * Copy the compiles JS files to the distribution
 */
gulp.task('copy-www', function () {
  return gulp.src('./platforms/android/app/src/main/assets/www/**/*')
    .pipe(gulp.dest('./dist'));
});

/**
 * Prepare the resources to make sure they are shown in Android
 */
gulp.task('splash-resources', function () {
  return gulp.src('config.xml')
    .pipe(cheerio({
      run: function ($) {

        $('widget').attr('version', require('./package').version);
        $('platform[name = "android"] splash').each(function (index, element) {
          const densitySplit = $(element).attr('density').split('-');
          const qualifier = densitySplit[0];
          const density = densitySplit[1];

          $(element).attr('qualifier', qualifier);
          $(element).attr('density', density);
          $(element).attr('src', $(element).attr('src').replace('xxx', 'xx'));
        });
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(gulp.dest('./dist/'));
});
