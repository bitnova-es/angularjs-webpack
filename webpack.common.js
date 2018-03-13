const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let htmlOptions = {
	title: "app",
	filename: "main.html",
	hash: true,
	showErrors: true,
	template: "./src/main.html"
};

module.exports = {
	entry: {
		app: "./src/main.ts"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "awesome-typescript-loader"
					},
					{
						loader: "angularjs-template-loader"
					}
				],
				exclude: [/\.(spec|e2e)\.ts$/]
			},
			{
				test: /\.html$/,
				use: ["raw-loader"]
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							mimetype: "application/font-woff",
							outputPath: "assets/fonts/"
						}
					}
				]
			},
			{
				test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: "assets/fonts/"
						}
					}
				]
			},
			{
				test: /\.(svg|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: "assets/images/"
						}
					}
				]
			},
			{
				test: /\.(s*)css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader"
						},
						{ loader: "sass-loader" }
					]
				})
			},
			{
				test: /\.json$/,
				loader: "json-loader"
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			"@app": path.resolve(__dirname, "src/app/"),
			"@node_modules": path.resolve(__dirname, "node_modules/")
		}
	},
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new ExtractTextPlugin({
			filename: "[name].bundle.css"
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			chunks: ["app"],
			minChunks: ({ resource }) => /node_modules/.test(resource)
		}),
		new HtmlWebpackPlugin(htmlOptions)
	],
	output: {
		filename: "[name].bundle.js",
		chunkFilename: "[name]-[chunkhash].js",
		path: path.resolve(__dirname, "dist")
	}
};
