require("dotenv").config();

import * as fs from "fs";
import * as path from "path";

import * as React from "react";
import * as express from "express";
import { Express } from "express";
import { parsePath } from "history";
import { renderFile } from "ejs";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Provider } from "react-redux";
import { HeadProvider } from "react-head";

import App from "@app/App";
import preload from "@app/lib/preload";
import { createStore } from "@app/store";
import connection from "@server/database/connection";

import { isDev } from "./utils";

// eslint-disable-next-line import/no-unresolved
import style from "!!raw-loader!sass-loader!@app/components/Loading/style.scss";
const styles = `<style>${style.toString().replace(/\s+/gm, " ")}</style>`;

const app: Express = express();

app.use("/dist", express.static("dist"));
app.set("view engine", "ejs");
app.engine("html", renderFile);
app.set("views", path.resolve("server/views"));

connection.authenticate();

app.get("**", async (req, res) => {
	const store = createStore(undefined);
	try {
		store.dispatch({ type: "INIT_APP" });
		await preload(App, { store, location: parsePath(req.url), isDev });
		const headTags: any = [];
		const html = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url} context={{}}>
					<HeadProvider headTags={headTags}>
						<App />
					</HeadProvider>
				</StaticRouter>
			</Provider>,
		);

		const { js, css, assets } = getAssets();
		const data = {
			__DEV__: isDev(),
			assets,
			content: html,
			state: store.getState(),
			styles,
			headTags: renderToString(headTags),
			linkTags: css.join(""),
			scriptTags: js.join(""),
		};
		return res.render("index", data);
	} catch (error) {
		return res.send(JSON.stringify({ error: error.toString() }, null, 2));
	}
});

function getAssets() {
	const assets = loadAssets();

	const css = assets.script.css.map(
		link => `<link rel="stylesheet" href="${link}"/>`,
	);
	const js = [
		...assets.module.js.map(
			module => `<script type="module" src="${module}"></script>`,
		),
		...assets.script.js.map(
			script =>
				`<script type="text/javascript" src="${script}" nomodule></script>`,
		),
	];

	return {
		css,
		js,
		assets,
	};
}

function loadAssets() {
	return JSON.parse(
		fs.readFileSync(path.resolve("build/assets.json")).toString(),
	);
}

const port = process.env.PORT || 3000;
app.listen(port, () =>
	// eslint-disable-next-line no-console
	console.log(
		`Nodejs app running on http://localhost:${port} (${process.env.NODE_ENV}) `,
	),
);
