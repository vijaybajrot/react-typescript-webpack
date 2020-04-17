import * as path from "path";

import * as nodeExternals from "webpack-node-externals";
import * as autoprefixer from "autoprefixer";

export const production = process.env.NODE_ENV === "production" ? true : false;

export const alias = {
	"@app": path.resolve("app"),
	"@server": path.resolve("server"),
	"@lib": path.resolve("lib"),
};

export const externals = [nodeExternals()];

export function cacheLoader() {
	return {
		loader: "cache-loader",
	};
}

export function postCssLoader() {
	const result = {
		loader: "postcss-loader",
		options: {
			plugins: [autoprefixer()],
		},
	};

	return result;
}
