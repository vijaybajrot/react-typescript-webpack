import * as React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import { HeadProvider, Title, Link, Meta } from "react-head";

import preload from "@app/lib/preload";
import { store as createStore } from "@app/store";

import App from "./App";

async function main() {
  const store = createStore();

  const history = createHistory();
  if (!history) {
    await loadPage(history.location, true);
  }

  const root = document.getElementById("root");
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
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
