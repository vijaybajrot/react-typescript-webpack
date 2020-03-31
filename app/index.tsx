import * as React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const mode = process.env.NODE_ENV;
const rootReducer = function(state = {}, action) {
  switch (action.type) {
    case "INIT_VIEW":
      return action.data || state;
    default:
      return state;
  }
};
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function;
  }
}
const store = createStore(
  rootReducer,
  mode === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = document.getElementById("root");
hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  root
);
