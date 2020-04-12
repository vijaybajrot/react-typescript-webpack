import * as React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { Router as BrowserRouter } from "react-router";
import { createBrowserHistory as createHistory } from "history";
import { HeadProvider } from "react-head";

import env from "@app/utils/env";
import preload from "@app/lib/preload";
import { createStore } from "@app/store";

import App from "./App";

async function main() {
  if (!env.get("history")) {
    env.set("history", createHistory());
    await loadPage(env.get<any>("history").location, true);
  }

  if (!env.get("store")) {
    env.set(
      "store",
      createStore(
        JSON.parse(document.getElementById("store-state").textContent)
      )
    );
  }

  const unlisten = env
    .get<any>("history")
    .listen((locaction) => loadPage(locaction));

  hydrate(
    <Provider store={env.get<any>("store")}>
      <BrowserRouter history={env.get<any>("history")}>
        <HeadProvider>
          <App />
        </HeadProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );

  const loader = document.getElementById("loader");
  if (loader) {
    loader.remove();
  }

  if (module.hot) {
    module.hot.dispose(() => {
      unlisten();
    });

    // eslint-disable-next-line
    module.hot.accept(console.error);
    module.hot.accept("@app/store/reducer", () => {
      env
        .get<any>("store")
        .replaceReducer(require("@app/store/reducer").default);
    });
  }
}

async function loadPage(location, hydrate = false) {
  try {
    const { scrollX = 0, scrollY = 0, anchor } = location.state || {};
    if (hydrate || !anchor) {
      await preload(App, {
        location,
        hydrate,
        store: env.get("store"),
      });
    }
    if (!hydrate && !anchor) {
      scrollTo(scrollX, scrollY);
    }
  } catch (err) {
    throw err;
  }
}
main();
