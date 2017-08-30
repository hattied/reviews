const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'source-map',

    // entry point of our application, within the `src`
    // directory (which we add to resolve.modules below)
    entry: [
        'index.ts',
    ],

    // configure the output directory and publicPath for the devServer
    output: {
        filename: 'app.js',
        publicPath: 'dist/',
        path: path.resolve(__dirname, 'dist'),
    },

    // configure the dev server to run
    devServer: {
        port: 3000,
        historyApiFallback: {
            index: './index.html',
        },
        inline: true,
        host: '0.0.0.0',
        disableHostCheck: true,
    },
    // tell Webpack to load TypeScript files
    resolve: {
        // Look for modules in .ts(x) files first, then .js
        extensions: ['.ts', '.tsx', '.js', '.json'],

        // add 'src' to the modules, so that when you import
        // files you can do so with 'src' as the relative route
        modules: ['src', 'node_modules'],
    },

    module: {
        loaders: [
            // .ts(x) files should first pass through the Typescript loader, and then through babel
            {test: /\.tsx?$/, loaders: ['babel-loader', 'ts-loader'], include: path.resolve('src')},
            {test: /\.styl$/, loaders: ['style-loader', 'css-loader', 'stylus-loader']},
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file-loader',
                ],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
            },
            {
                test: /\.(woff2|woff)$/, loaders: ['file-loader'],
            },
            {test: /\.json$/, loaders: ['json-loader']},
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            }
        ],
    },
};