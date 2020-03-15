import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

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

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
