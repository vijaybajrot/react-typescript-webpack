require("dotenv").config();

import * as fs from "fs";
import * as path from "path";
import * as React from "react";
import { parsePath } from "history";
import { renderFile } from "ejs";
import * as express from "express";
import { Express } from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "@app/App";
import preload from "@app/lib/preload";

import { isDev } from "./utils";

const app: Express = express();

const rootReducer = function (state = {}, action) {
  switch (action.type) {
    case "INIT_VIEW":
      return action.data || state;
    default:
      return state;
  }
};

const store = createStore(rootReducer);

app.use("/dist", express.static("dist"));
app.set("view engine", "ejs");
app.engine("html", renderFile);
app.set("views", path.resolve("server/views"));

app.get("**", async (req, res) => {
  try {
    await preload(App, { location: parsePath(req.url) });

    let html;
    try {
      html = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={{}}>
            <App />
          </StaticRouter>
        </Provider>
      );
    } catch (error) {
      throw error;
    }
    const { js, css } = getAssets();
    const data = {
      content: html,
      linkTags: css.join("\n"),
      scriptTags: js.join("\n"),
    };
    return res.render("index", data);
  } catch (error) {
    return res.send(JSON.stringify({ error: error.toString() }, null, 2));
  }
});

function getAssets() {
  const assets = loadAssets();
  let css = [];
  let js = [];

  if (isDev()) {
    js = [`<script type="text/javascript" src="/dist/main.js"></script>`];
  } else {
    css = assets.script.css.map(
      (css) => `<link rel="stylesheet" href="${css}"/>`
    );
    js = assets.script.js.map(
      (js) => `<script type="text/javascript" src="${js}"></script>`
    );
    js = [
      ...js,
      ...assets.module.js.map(
        (module) => `<script type="module" src="${module}"></script>`
      ),
    ];
  }

  return {
    css,
    js,
    assets,
  };
}

function loadAssets() {
  return JSON.parse(
    fs.readFileSync(path.resolve("build/assets.json")).toString()
  );
}

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(
    `Nodejs app running on port http://localhost:${port} (${process.env.NODE_ENV}) `
  )
);
