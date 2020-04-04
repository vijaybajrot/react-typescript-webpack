import * as React from "react";
import { hydrate, render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";

import preload from "@app/lib/preload";

import App from "./App";

const mode = process.env.NODE_ENV;
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function;
  }
}

async function main() {
  const rootReducer = function (state = {}, action) {
    switch (action.type) {
      case "INIT_VIEW":
        return action.data || state;
      default:
        return state;
    }
  };

  const store = createStore(
    rootReducer,
    mode === "development" &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  const history = createHistory();
  if (!history) {
    await loadPage(history.location, true);
  }

  const root = document.getElementById("root");
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
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
    console.log({ err: err });
    throw err;
  }
}
main();
