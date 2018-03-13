const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = merge(common, {
    plugins: [
		new CleanWebpackPlugin(["dist"]),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			chunks: ["app"],
			minChunks: ({ resource }) => /node_modules/.test(resource)
		}),
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessor: require("cssnano"),
			cssProcessorOptions: { discardComments: { removeAll: true } },
			canPrint: true
		})
	]
});
