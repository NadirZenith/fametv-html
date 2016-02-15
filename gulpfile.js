var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var concat = require('gulp-concat');
var less = require('gulp-less');
/*var less = require('gulp-less-sourcemap');*/
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

var path = {
    dist: 'dist/',
    node_modules: 'node_modules/'
};

gulp.task('modules', function () {
    gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/video.js/dist/video.min.js',
        'node_modules/jquery.easing/jquery.easing.min.js',
        'node_modules/lodash/lodash.js',
        'node_modules/backbone/backbone-min.js',
        'node_modules/mprogress/mprogress.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/share-button/dist/share-button.min.js',
    ])
            .pipe(sourcemaps.init())
            .pipe(concat('modules.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(path.dist));

});

gulp.task('scripts', function () {
    gulp.src([
        'src/js/*.js',
    ])
            .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(path.dist));
});

gulp.task('styles', function () {
    gulp.src([
        'src/less/main.less'
    ])
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(minifyCSS())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(path.dist));
});

gulp.task('app', function () {
    browserify({
        entries: ['src/js/main.js'],
        debug: true,
        paths: ['./node_modules']
    })
            .bundle()
            .pipe(source('build.min.js'))
            .pipe(gulp.dest('./dist'));
});

gulp.task('default', function () {
    gulp.run('scripts', 'styles', 'app');

    gulp.watch('src/js/**', function (event) {
        gulp.run('app');
    });

    gulp.watch('src/less/**', function (event) {
        gulp.run('styles');
    });

});