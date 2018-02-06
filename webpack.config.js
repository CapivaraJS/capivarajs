const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const baseName = "capivara";

const isProduction = () => process.env.NODE_ENV == 'production';

const extractSass = new ExtractTextPlugin({
    filename: isProduction() ? baseName + ".min.css" : baseName + ".css",
    allChunks: true
});

let plugins = [extractSass];

if (isProduction()) {
    plugins.push(new UglifyJSPlugin());
}

module.exports = {
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
    devtool: 'source-map',
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            },
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
            },
            {
                test: /\.(jpe?g|png|gif|svg|eot|woff2|woff|ttf)$/i,
                use: "file-loader?name=assets/[name].[ext]"
            }
        ]
    }
};