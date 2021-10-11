const path = require('path'), MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: "production",
	output: {
		path: path.join(__dirname, "assets"),
		filename: "js/tumbot.min.js",
	},
	devServer: {
		port: 4000
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [new MiniCssExtractPlugin({ filename: "css/tumbot.min.css" })]
};