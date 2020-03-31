import * as fs from "fs";
import * as path from "path";
import * as React from "react";
import { renderFile } from "ejs";
import * as express from "express";
import { Express } from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";

import App from "@app/App";
import Routes from "@app/routes";
import { isDev } from "./utils";

const app: Express = express();

const rootReducer = function(state = {}, action) {
  switch (action.type) {
    case "INIT_VIEW":
      return action.data || state;
    default:
      return state;
  }
};

const store = createStore(rootReducer);

app.use(express.static("dist"));
app.set("view engine", "ejs");
app.engine("html", renderFile);
app.set("views", path.resolve("server/views"));

app.get("**", async (req, res) => {
  const currentRoute = Routes.find(route => matchPath(req.url, route));
  const fetchData =
    currentRoute &&
    currentRoute.component.fetchData &&
    currentRoute.component.fetchData();

  Promise.resolve(fetchData).then(initialData => {
    const context: any = { initialData: initialData };
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );
    /*
    const statsFile = path.resolve("dist/stats.json");
    const extractor = new ChunkExtractor({
      statsFile
    });
    const jsx = extractor.collectChunks(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );
    const html = renderToString(jsx);
    const scriptTags = extractor.getScriptTags(); // or extractor.getScriptElements();
    const linkTags = extractor.getLinkTags(); // or extractor.getLinkElements();
    const styleTags = extractor.getStyleTags(); // or extractor.getStyleElements();
    */
    const { js, css } = getAssets();
    const data = {
      content: html,
      linkTags: css.join("\n"),
      scriptTags: js.join("\n")
    };
    return res.render("index", data);
  });
});

function getAssets() {
  const assets = loadAssets();
  let css = assets.client.css.map(
    css => `<link rel="stylesheet" href="${css}"/>`
  );
  let js = [];

  if (isDev()) {
    js = [`<script type="text/javascript" src="/main.js"></script>`];
  } else {
    js = assets.client.js.map(
      js => `<script type="text/javascript" src="${js}"></script>`
    );
  }

  return {
    css,
    js,
    assets
  };
}

function loadAssets() {
  return JSON.parse(
    fs.readFileSync(path.resolve("build/assets.json")).toString()
  );
}

app.listen(5000, () => console.log("App running on port 5000"));
