import * as fs from "fs";
import * as path from "path";

import * as webpack from "webpack";

function main() {
	const [
		clientBrowserConfig,
		clientConfig,
	] = require("./config/prod.config").default;
	const serverConfig = require("./config/prod-server.config").default;
	const compiler = webpack([serverConfig, clientBrowserConfig, clientConfig]);

	compiler.run((err, stats) => {
		if (stats) {
			const builds = stats.toJson({ assets: true }).children;
			fs.writeFileSync(
				path.join(__dirname, "../build/assets.json"),
				JSON.stringify({
					script: createAssets(
						clientBrowserConfig.output.publicPath,
						builds[1].entrypoints.main.assets,
					),
					module: createAssets(
						clientConfig.output.publicPath,
						builds[2].entrypoints.main.assets,
					),
				}),
			);
		}
		console.log(
			err ||
				stats.toString({
					all: false,
					chunks: true,
					colors: true,
					errors: true,
					timings: true,
					warnings: true,
					performance: true,
					errorDetails: true,
				}),
		);
	});
}

function createAssets(publicPath, assets) {
	const css = [],
		js = [];
	for (let i = 0; i < assets.length; i++) {
		switch (path.extname(assets[i])) {
			case ".css":
				css.push(path.join(publicPath, assets[i]));
				break;
			default:
				js.push(path.join(publicPath, assets[i]));
		}
	}
	return { css, js };
}

main();
