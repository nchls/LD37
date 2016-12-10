var path = require('path');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var htmlPlugin = require('html-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

 module.exports = {
	context: path.join(__dirname),
	entry: path.join(__dirname, 'client', 'client.js'),
	output: {
		path: path.join(__dirname, 'client', 'dist'),
		filename: '/bundle.js'
	},
	plugins: [
		new htmlPlugin({
			template: path.join(__dirname, 'client', 'index.html'),
		}),
		new extractTextPlugin('style.css'),
		new DashboardPlugin()
	],
	devtool: 'sourcemap',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.less$/,
				loader: extractTextPlugin.extract(
					'css-loader?sourceMap!' +
					'less-loader?sourceMap'
				)
			}
		]
	}
};
