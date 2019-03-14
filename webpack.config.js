'use strict';
var path = require('path');
var webpack = require('webpack');
var env = process.env.NODE_ENV;
let config = {
    mode: 'development',
    entry: {
        app: './src/res/js/game/Main.ts'
    },
    output: {
        path: `${__dirname}/build/js`,
        filename: 'output.js'
    },
    resolve: {
        extensions: ['.ts', '.webpack.js', '.web.js', '.js']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};

if (env === 'production') {
    config.output.filename = 'output.min.js';
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
} else {
    config.devtool = 'source-map';
}

module.exports = config;
