'use strict'

var gulp           = require('gulp'),
    sass           = require('gulp-sass'),
    watch          = require('gulp-watch'),
    browserSync    = require('browser-sync'),
    concat         = require('gulp-concat'),
    rename         = require('gulp-rename'),
    uglify         = require('gulp-uglify'),
    gpFilter       = require('gulp-filter'),
    mainBowerFiles = require('main-bower-files'),
    autoprefixer   = require('gulp-autoprefixer'),
    cleanCSS       = require('gulp-clean-css'),
    inject         = require('gulp-inject'),
    series         = require('stream-series'),
    order          = require('gulp-order'),
    runQ           = require('gulp-run-sequence');

var src = {
  root: './src',
  scss: ['./src/assets/scss/*.scss', '!./src/assets/scss/_*.scss'],
  index: './src/**/index.html',
  angular: {
    root: '/src/**/*.js',
    modules: '/src/components/**/*.module.js',
    components: '/src/components/**/*.component.js',
    templates: './src/components/**/*.template.html',
    filters: '/src/**/*.filter.js',
    services: '/src/**/*.service.js'
  }
};

var path = {
  css: 'assets/css',
  html: 'assets/html',
  js: 'core',
  external: 'assets/js',
  fonts: 'assets/fonts',
  img: 'assets/img'
};

var TEST = './test/';
var PROD = './dist/';

//build css from scss and stream *TESTED*
gulp.task('build:scss', function () {
  return gulp.src(src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(TEST+path.css))
    .pipe(browserSync.stream())
    .pipe(concat('app.css'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest(PROD+path.css))
});

//build angular app *TESTED* 'src/**/app.js'
gulp.task('build:app', ['fetch:templates'], function () {
  return gulp.src(['./src/**/*.js'])
    .pipe(order([
      '**/*.module.js',
      '**/*.component.js',
      'app.js',
      '**/*'
    ]))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(TEST))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest(PROD))
});

//fetch html templates *TESTED*
gulp.task('fetch:templates', function() {
  return gulp.src(src.angular.templates)
    .pipe(gulp.dest(TEST+path.html))
    .pipe(gulp.dest(PROD+path.html))
});

//fetch index
gulp.task('fetch:index', function() {
  return gulp.src(src.index)
    .pipe(gulp.dest(TEST))
    .pipe(gulp.dest(PROD))
});

//build vendor assets *TESTED*
gulp.task('build:vendor', function() {

  var jsFilter = gpFilter('**/*.js', {restore: true });
  var cssFilter = gpFilter('**/*.css', {restore: true });

  return gulp.src(mainBowerFiles())
    .pipe(cssFilter)
    .pipe(gulp.dest(TEST+path.css))
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest(PROD+path.css))
    .pipe(cssFilter.restore)

    .pipe(jsFilter)
    .pipe(gulp.dest(TEST+path.external))
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest(PROD+path.external))
    .pipe(jsFilter.restore)
});

//fetch fonts from vendors *TESTED*
gulp.task('fetch:fonts', function () {
  return gulp.src('./external/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(PROD+path.fonts))
    .pipe(gulp.dest(TEST+path.fonts));
});

//fetch images from src
gulp.task('fetch:images', function () {
  return gulp.src(src.root+'/**/*.{svg,png,jpg,jpeg}')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(PROD+path.img))
    .pipe(gulp.dest(TEST+path.img));
});

//dev server 
gulp.task('devSync', function() {
  browserSync({ server: { baseDir: TEST }});
});

//dev server 
gulp.task('prodSync', function() {
  browserSync({ server: { baseDir: PROD }});
});

//run devsync server and buld scss
gulp.task('run', ['devSync'], function() {
  gulp.watch(src.scss, ['build:scss']);
  gulp.watch(src.html).on('change', browserSync.reload);
  gulp.watch(src.angular.root, ['build:app']).on('change', browserSync.reload);
});

// ALL TOGETHER: PRODUCTION
gulp.task('build', function() {
  runQ(['build:scss', 'build:vendor', 'build:app', 'fetch:images', 'fetch:index'], 'index');
});

gulp.task('index',['index:prod'], function() {
  var testVendor = gulp.src(['./test/**/*.css', './test/**/*.js', '!./test/**/app.*'], {read: false});
  var testApp = gulp.src(['./test/**/app.*'], {read: false});

  return gulp.src('./test/**/index.html')
    .pipe(inject(testVendor, {name: 'vendor', relative: true}))
    .pipe(inject(testApp, {name: 'app', relative: true}))
    .pipe(gulp.dest(TEST))
});

gulp.task('index:prod', function() {
  var prodVendor = gulp.src('./dist/**/vendor.*', {read: false});
  var prodApp = gulp.src('./dist/**/app.*', {read: false})

  return gulp.src('./dist/**/index.html')
    .pipe(inject(prodVendor, {name: 'vendor', relative: true}))
    .pipe(inject(prodApp, {name: 'app', relative: true}))
    .pipe(gulp.dest(PROD))
});