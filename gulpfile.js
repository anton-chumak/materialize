var gulp = require('gulp');
var includer = require('gulp-htmlincluder');
var concatCss = require('gulp-concat-css');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

gulp.task('server', function(){
	connect.server({
		root: 'build/',
		livereload: true
	});
});

gulp.task('css', function(){
	gulp.src('dev/css/*.css')
	.pipe(concatCss('style.css'))
	.pipe(gulp.dest('build/css/'))
	.pipe(connect.reload());
});

gulp.task('html', function(){
	gulp.src('dev/html/**/*.html')
	.pipe(includer())
	.pipe(gulp.dest('build/'))
	.pipe(connect.reload());
});
gulp.task('move',function(){
	gulp.src('dev/fonts/**/*.*').pipe(gulp.dest('build/fonts'));
	gulp.src('dev/js/*.js').pipe(gulp.dest('build/js'));
	gulp.src('dev/img/**/*.*').pipe(gulp.dest('build/img'));
});

gulp.task('default', function(){
	gulp.start('server', 'css', 'html', 'move');
	gulp.watch(['dev/css/*.css'], function(){
		gulp.start('css');
	});

	gulp.watch(['dev/html/**/*.html'], function(){
		gulp.start('html');
	 });
});