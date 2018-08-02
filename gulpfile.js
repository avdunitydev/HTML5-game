'use strict';
var WORK_DIR = './public_html';
var paths = {
	style_dest: [WORK_DIR + '/assets/css'],
	files_sass: [WORK_DIR + "/assets/sass/*.scss"],
	files_css: [WORK_DIR + '/assets/css/**/*.css'],
	files_js: [WORK_DIR + '/assets/js/**/*.js'],
	files_html: [WORK_DIR + '/**/*.html']
};

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );

gulp.task('default', ['serve']);

gulp.task('sass:watch', function () {
	console.log('\n>>>>>>>>>>>> GULP start watching\n');
	gulp.watch(paths.files_sass, ['sass']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src(paths.files_sass)
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest(paths.style_dest + ''))
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
	gulp.watch(paths.files_sass, ['sass']);
	gulp.watch(paths.files_css).on('change', browserSync.reload);
	gulp.watch(paths.files_html).on('change', browserSync.reload);
	gulp.watch(paths.files_js).on('change', browserSync.reload);
});

// Выгрузка изменений на хостинг
gulp.task( 'deploy', function () {
	var conn = ftp.create( {
			host:     'files.000webhost.com',
			user:     'freerpgame',
			password: '000wh!freerpgame',
			parallel: 10,
			log:      gutil.log
	} );
	var globs = [
			WORK_DIR + '/**'
	];
	return gulp.src( globs, { base: '.', buffer: false } )
			.pipe( conn.dest( './' ) );
} );
