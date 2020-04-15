const path = require("path");
const LoadablePlugin = require("@loadable/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	name: "client",
	mode: "production",
	entry: path.resolve("app/index.tsx"),
	devtool: false,
	output: {
		publicPath: "/dist/",
		path: path.resolve("dist"),
		filename: "[name].js",
		chunkFilename: "[id].js",
	},
	plugins: [
		new LoadablePlugin({ filename: "stats.json", writeToDisk: true }),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
	],
	resolve: {
		alias: {
			"@app": path.resolve("app"),
		},
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.js|tsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								[
									require("@babel/preset-env"),
									{
										corejs: 3,
										modules: false,
										useBuiltIns: "usage",
										targets: {
											esmodules: true,
										},
									},
								],
								require("@babel/preset-typescript"),
								[
									require("@babel/preset-react"),
									{
										development: false,
									},
								],
							],
							plugins: ["@loadable/babel-plugin"],
						},
					},
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					//'postcss-loader',
					{
						loader: "sass-loader",
					},
				],
			},
		],
	},
};
