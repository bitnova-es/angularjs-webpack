const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
	plugins: [
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
