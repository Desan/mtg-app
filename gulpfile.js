'use strict'

var gulp        = require('gulp'),
	sass        = require('gulp-sass'),
	watch       = require('gulp-watch'),
	browserSync = require('browser-sync')

var path = {
	scss: ['dev/scss/**/*.scss','!dev/scss/**/_*.scss']
}

gulp.task('scss', function () {
	return gulp.src(path.scss)
				.pipe(sass().on('error', sass.logError))
				.pipe(gulp.dest('app/assets/css'))
				.pipe(browserSync.reload(
				 	{
						stream: true
				   }
			   ))
})

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
	})
});

gulp.task('run', ['browserSync', 'scss'], function() {
	gulp.watch('dev/scss/**/*.scss', ['scss']);
	gulp.watch('app/**/*.html').on('change', browserSync.reload);
});