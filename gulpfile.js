'use strict';
var WORK_DIR = './public_html';
var paths = {
	games_dir: [WORK_DIR + '/games/**/*'],
	css_dir: [WORK_DIR + '/assets/css'],
	sass_files: [WORK_DIR + "/assets/sass/*.scss"],
	css_files: [WORK_DIR + '/assets/css/**/*.css'],
	js_files: [WORK_DIR + '/assets/js/**/*.js'],
	html_files: [WORK_DIR + '/**/*.html']
};

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );

gulp.task('default', ['serve']);

gulp.task('sass:watch', function () {
	console.log('\n>>>>>>>>>>>> GULP start watching\n');
	gulp.watch(paths.sass_files, ['sass']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src(paths.sass_files)
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest(paths.css_dir + ''))
			.pipe(browserSync.stream());
});

// Proxy Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
	browserSync.init({
		server: {
			baseDir: "public_html"
    },
    port: 3030,
    open: true,
    notify: false
	});
	// console.log('\n>>>>>>>>>>>> GULP start watching\n');
	gulp.watch(paths.sass_files, ['sass']);
	gulp.watch(paths.css_files).on('change', browserSync.reload);
	gulp.watch(paths.html_files).on('change', browserSync.reload);
	gulp.watch(paths.js_files).on('change', browserSync.reload);
	gulp.watch(paths.games_dir).on('change', browserSync.reload);
});

// Выгрузка изменений на хостинг
gulp.task( 'deploy', function () {
	var conn = ftp.create( {
			host:     'files.000webhost.com',
			user:     'freerpgame',
			password: '000wh!freerpgame',
			parallel: 5,
			log:      gutil.log
	} );
	var globs = [
			WORK_DIR + '/**'
	];
	return gulp.src( globs, { base: '.', buffer: false } )
			.pipe( conn.dest( './' ) );
} );
