const path = require('path');
const WebpackNightWatchPlugin = require('./webpack-nightwatch-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const argv = require('yargs').argv;

const baseName = "capivara";

const isProduction = () => process.env.NODE_ENV == 'production';

let plugins = [];

if (isProduction()) {
    plugins.push(new UglifyJSPlugin());
}

module.exports = function (env) {
    if(env && env.tests){
        plugins.push(
            new WebpackNightWatchPlugin({
                url: './nightwatch.conf.js'
            })
        );
    }
    return {
        mode: isProduction() ? 'production' : 'development',
        entry: path.join(__dirname, 'src', 'index'),
        output: {
            path: path.join(__dirname, 'dist'),
            filename: isProduction() ? baseName + '.min.js' : baseName + '.js',
            publicPath: 'dist'
        },
        devServer: {
            inline: true,
            port: 1111
        },
        devtool: isProduction() ? '' : 'source-map',
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                }
            ]
        }
    };
}