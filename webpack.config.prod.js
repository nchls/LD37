var path = require('path');
var webpack = require('webpack');

module.exports = {
	context: path.join(__dirname),
	entry: path.join(__dirname, 'client', 'app.js'),
	output: {
		path: path.join(__dirname, 'client', 'dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			}
		]
	}
};
