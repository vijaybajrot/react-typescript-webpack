process.env.NODE_ENV = "production";

import * as webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const config = require("./config/prod.config").default;
const [webpackBrowserConfig] = config;

webpackBrowserConfig.plugins.push(new BundleAnalyzerPlugin());
webpackBrowserConfig.plugins.push(new webpack.ProgressPlugin());

webpack(webpackBrowserConfig, (err, stats) => {
	if (err || stats.hasErrors()) {
		// eslint-disable-next-line no-console
		console.error(err);
	}
});
