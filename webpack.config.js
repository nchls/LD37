var path = require('path');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var htmlPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.join(__dirname),
	entry: path.join(__dirname, 'client', 'app.js'),
	output: {
		path: path.join(__dirname, 'client', 'dist'),
		filename: '/bundle.js'
	},
	plugins: [
		new htmlPlugin({
			template: path.join(__dirname, 'client', 'index.html'),
		})
	],
	devtool: 'sourcemap',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			}
		]
	}
};
