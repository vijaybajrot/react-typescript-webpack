import * as React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { Router as BrowserRouter } from "react-router";
import { createBrowserHistory as createHistory } from "history";
import { HeadProvider } from "react-head";

import preload from "@app/lib/preload";
import { store as createStore } from "@app/store";

import App from "./App";

async function main() {
  const state = JSON.parse(document.getElementById("store-state").textContent);
  const store = createStore(state);

  const history = createHistory();
  if (!history) {
    await loadPage(history.location, true);
  }

  const unlisten = history.listen((locaction) => loadPage(locaction));

  const loader = document.getElementById("loader");
  if (loader) {
    loader.remove();
  }

  const root = document.getElementById("root");
  hydrate(
    <Provider store={store}>
      <BrowserRouter history={history}>
        <HeadProvider>
          <App />
        </HeadProvider>
      </BrowserRouter>
    </Provider>,
    root
  );
}

async function loadPage(location, hydrate = false) {
  try {
    const { scrollX = 0, scrollY = 0, anchor } = location.state || {};
    if (hydrate || !anchor) {
      await preload(App, {
        location,
        hydrate,
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
