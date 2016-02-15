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
        /*'node_modules/videojs-youtube/dist/Youtube.min.js',*/
        'node_modules/jquery.easing/jquery.easing.min.js',
        /*'node_modules/waypoints/lib/jquery.waypoints.min.js',*/
        'node_modules/lodash/lodash.js',
        'node_modules/backbone/backbone-min.js',
        'node_modules/backbone.layoutmanager/backbone.layoutmanager.js',
        'node_modules/mprogress/mprogress.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/share-button/dist/share-button.min.js',
    ])
            .pipe(sourcemaps.init())
            .pipe(concat('modules.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(path.dist));
    /*    
     gulp.src([
     'node_modules/video.js/dist/video-js.min.css',
     ])
     .pipe(sourcemaps.init())
     .pipe(concat('modules.css'))
     .pipe(sourcemaps.write())
     .pipe(gulp.dest(path.dist));
     * */
});

gulp.task('scripts', function () {
    gulp.src([
        /*'src/js/libs/jquery.easing.min.js',*/
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
gulp.task('appworking', function () {
    browserify('src/js/main.js', {
        debug: true
    })
            .bundle()
            .pipe(source('build.min.js'))
            .pipe(gulp.dest('./dist'));
});

gulp.task('app', function () {
    browserify({
        entries: ['src/js/main.js'],
        debug: true,
        paths: ['./node_modules']
                // paths: ['./node_modules', './src/js/']
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