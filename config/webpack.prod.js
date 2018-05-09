const path = require('path');
const merge = require('webpack-merge');
const webpackCommon = require('./webpack.common');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(webpackCommon, {
	mode: 'production',
	output: {
		path: path.join(__dirname, '../dist/'),
		filename: 'capivara.min.js',
		publicPath: '/dist/'
	},
	plugins: [
		new UglifyJSPlugin()
	],
	module: {
		rules: []
	}
});