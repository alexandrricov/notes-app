(function () {
	'use strict';

	var gulp = require('gulp'),
	    del = require('del'),
	    jade = require('gulp-jade'),
	    stylus = require('gulp-stylus'),
	    nib = require('nib'),
	    connect = require('gulp-connect'),
	    sourcemaps = require('gulp-sourcemaps'),
	    minifyHTML = require('gulp-minify-html'),
	    concat = require('gulp-concat'),
	    minifyCss = require('gulp-minify-css'),
	    uglify = require('gulp-uglify'),
	    imagemin = require('gulp-imagemin'),
	    pngquant = require('imagemin-pngquant');

	var paths = {
		dist: './dist/',
	    app: {
	        templates: './src/jade/',
	        styles: './src/stylus/',
	        scripts: './src/js/',
	        img: './src/img/',
	        images: './src/images/',
	        fonts: './src/fonts/'
	    }
	};

	gulp.task('app.templates', function () {
	    var LOCALS = {};

	    del.sync('./dist/**/*.html');

	    return gulp.src(paths.app.templates + '*.jade')
	        .pipe(jade({
	            locals: LOCALS
	        }))
	        .pipe(gulp.dest(paths.dist))
	        .pipe(connect.reload());
	});

	gulp.task('app.styles', function () {
	    del.sync('./dist/**/*.css');

	    return gulp.src(paths.app.styles + 'styles.styl')
	        .pipe(sourcemaps.init())
	        .pipe(stylus({
	            use: nib(),
	            compress: true
	        }))
	        .pipe(sourcemaps.write())
	        .pipe(gulp.dest(paths.dist))
	        .pipe(connect.reload());
	});

	gulp.task('app.scripts', function () {
	    del.sync('./dist/**/*.js');

	    return gulp.src(paths.app.scripts + '**/*.js')
	        .pipe(sourcemaps.init())
	        .pipe(concat('scripts.js'))
	        .pipe(sourcemaps.write())
	        .pipe(gulp.dest(paths.dist))
	        .pipe(connect.reload());
	});

	gulp.task('app.img', function () {
	    del.sync('./dist/img/**/*.html');

	    return gulp.src(paths.app.img + '**/*')
	        .pipe(gulp.dest(paths.dist + 'img'))
	        .pipe(connect.reload());
	});

	gulp.task('app.images', function () {
	    del.sync('./dist/images/**/*.html');

	    return gulp.src(paths.app.images + '**/*')
	        .pipe(gulp.dest(paths.dist + 'images'))
	        .pipe(connect.reload());
	});

	gulp.task('app.fonts', function () {
	    del.sync('./dist/fonts/**/*');

	    return gulp.src(paths.app.fonts + '**/*')
	        .pipe(gulp.dest(paths.dist + 'fonts'))
	        .pipe(connect.reload());
	});

	gulp.task('clean', function () {
	    del.sync(paths.dist + '**/*');
	});

	gulp.task('dev.build', function () {
	    gulp.start(
	        'app.templates',
	        'app.styles',
	        'app.scripts',
	        'app.img',
	        'app.images',
	        'app.fonts'
	    );
	});

	gulp.task('dev.watch', function () {
	    gulp.watch(paths.app.templates + '/**/*.jade', ['app.templates']);
	    gulp.watch(paths.app.styles + '/**/*.styl', ['app.styles']);
	    gulp.watch(paths.app.scripts + '/**/*.js', ['app.scripts']);
	    gulp.watch(paths.app.img + '/**/*', ['app.img']);
	    gulp.watch(paths.app.images + '/**/*', ['app.images']);
	    gulp.watch(paths.app.fonts + '/**/*', ['app.fonts']);
	});

	gulp.task('dev.server', function () {
	  connect.server({
	    root: './dist',
	    port: 8000,
	    livereload: true
	  });
	});

	gulp.task('dev', ['clean', 'dev.build', 'dev.server', 'dev.watch']);

	gulp.task('release', ['clean'], function () {
	    gulp.src(paths.app.templates + '*.jade')
	        .pipe(jade())
	        .pipe(minifyHTML({
	            empty: true,
	            conditionals: true,
	            spare:true
	        }))
	        .pipe(gulp.dest(paths.dist));

	    gulp.src(paths.app.styles + 'styles.styl')
	        .pipe(stylus({
	            use: nib(),
	            compress: true
	        }))
	        .pipe(minifyCss())
	        .pipe(gulp.dest(paths.dist));

	    gulp.src(paths.app.scripts + '**/*.js')
	        .pipe(concat('scripts.js'))
	        .pipe(uglify())
	        .pipe(gulp.dest(paths.dist));

	    gulp.src(paths.app.img + '**/*')
	        .pipe(imagemin({
	            optimizationLevel: 7,
	            progressive: true,
	            svgoPlugins: [{removeViewBox: false}],
	            use: [pngquant()]
	        }))
	        .pipe(gulp.dest(paths.dist + 'img'));

	    gulp.src(paths.app.images + '**/*')
	        .pipe(imagemin({
	            optimizationLevel: 7,
	            progressive: true,
	            svgoPlugins: [{removeViewBox: false}],
	            use: [pngquant()]
	        }))
	        .pipe(gulp.dest(paths.dist + 'images'));

	    gulp.src(paths.app.fonts + '**/*')
	        .pipe(gulp.dest(paths.dist + 'fonts'));
	});
})();
