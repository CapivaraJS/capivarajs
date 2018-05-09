const path = require('path');
const merge = require('webpack-merge');
const webpackCommon = require('./webpack.common');

module.exports = merge(webpackCommon, {
	mode: 'development',
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, '../dist/'),
		filename: 'capivara.js',
		publicPath: '/dist/'
	},
	devServer: {
		inline: true,
		host: '0.0.0.0',
		port: 1111
	},
	plugins: [],
	module: {
		rules: []
	}
});