import * as path from "path";

import * as webpack from "webpack";

import { alias, cacheLoader, postCssLoader } from "./common.config";

export default {
	name: "client",
	mode: "development",
	entry: path.resolve("app/index.tsx"),
	devtool: "inline-source-map",
	output: {
		publicPath: "/dist/",
		path: path.resolve("dist"),
		filename: "[name].js",
		chunkFilename: "[id].js",
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
	resolve: { alias, extensions: [".ts", ".tsx", ".js"] },
	module: {
		rules: [
			{
				test: /\.js|tsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					cacheLoader(),
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
										development: true,
									},
								],
							],
							plugins: [
								"@babel/plugin-syntax-dynamic-import",
								"@babel/plugin-proposal-class-properties",
								"@babel/plugin-proposal-export-default-from",
								"@babel/plugin-proposal-export-namespace-from",
							],
						},
					},
				],
			},
			{
				test: /\.s[ac]ss$/i,
				oneOf: [
					{
						test: /app.scss/,
						use: [
							cacheLoader(),
							"style-loader",
							"css-loader",
							postCssLoader(),
							"sass-loader",
						],
					},
					{
						use: [
							cacheLoader(),
							"style-loader",
							{
								loader: "css-loader",
								options: {
									modules: {
										localIdentName: "[path][name]__[local]--[hash:base64:5]",
									},
								},
							},
							postCssLoader(),
							{
								loader: "sass-loader",
							},
						],
					},
				],
			},
		],
	},
};
