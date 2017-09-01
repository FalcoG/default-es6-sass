const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');


/**
 * Usage: npm run gulp-watch,
 *        npm run gulp-build
 */

gulp.task('styles', function () {
    'use strict';
    gulp.src('build/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('././public/css/'));
});

gulp.task('js', function () {
    'use strict';

    browserify(['build/js/main.js'])
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('././public/js/'));
    gulp.src(['build/js/lib/*.js'])
        .pipe(gulp.dest('././public/js/lib/'));
});

gulp.task('html', function () {
    'use strict';
    gulp.src('build/html/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('././public/'));
});

gulp.task('default', function () {
    'use strict';
    gulp.watch('build/sass/**/*.scss', ['styles']);
    gulp.watch('build/js/**/*.js', ['js']);
    gulp.watch('build/html/**/*.html', ['html']);
});

gulp.task('build', function () {
    'use strict';
    gulp.start('styles');
    gulp.start('js');
    gulp.start('html');
});