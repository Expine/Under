var gulp = require('gulp');

// webpack
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var del = require('del');

var TS_SRC = './src/res/js/**/*.ts';
var JS_DEST = './build/js/';

gulp.task('clean', function() {
    del([JS_DEST]);
});

gulp.task('webpack', function() {
    return gulp.src([TS_SRC])
        .pipe(webpackStream(webpackConfig, webpack))
        // エラーが発生した時に終了させない
        .on('error', function(error) {
            this.emit('end');
        })
});

gulp.task('watch', function() {
    gulp.watch(TS_SRC, gulp.task('webpack'));
});

gulp.task('default', gulp.series(gulp.parallel('webpack', 'watch'), function() {
}));
