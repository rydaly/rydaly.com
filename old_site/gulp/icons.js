'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('icons', function() {
  return gulp.src([
    './bower_components/font-awesome/fonts/**.*'])
    .pipe(gulp.dest(path.join(conf.paths.src, '/fonts')));
});

gulp.task('iconsass', function() {
  return gulp.src([
    './bower_components/font-awesome/scss/_icons.scss'])
    .pipe(gulp.dest(path.join(conf.paths.src, '/app/styles/fonts')));
});