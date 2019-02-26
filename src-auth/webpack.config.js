const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const env=require('dotenv').config();

module.exports = {
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        path: path.resolve(__dirname, '../build/'),
        filename: '[hash].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'auth',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyCSS: true,
            },
            template: path.resolve('src-auth/index.html'),
        }),
    ],
};
