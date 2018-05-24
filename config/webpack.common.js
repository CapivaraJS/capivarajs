const path = require('path');
const isTest = process.argv.indexOf('--t') !== -1;
const WebpackNightWatchPlugin = require('../webpack-nightwatch-plugin');

const plugins = [];

if(isTest){
	plugins.push(
		new WebpackNightWatchPlugin({
			url: 'nightwatch.conf.js'
		})
	);
}

module.exports = {
	context: __dirname,
	entry: {
		bundle: path.join(__dirname, '../src', 'index')
	},
	plugins: plugins,
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.(html)$/,
				use: 'html-loader'
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				exclude: [/node_modules/, /util\/observe/],
				use: 'babel-loader'
			},
			{
				test: /\.(jpe?g|png|gif|svg|eot|woff2|woff|ttf)$/i,
				use: 'file-loader?name=assets/[name].[ext]'
			}
		]
	}
};