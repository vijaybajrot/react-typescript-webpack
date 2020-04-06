import { createStore } from "redux";

import rootReducer from "./reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function;
  }
}

export const store = (initialState) => {
  if (
    process.env.NODE_ENV === "development" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  ) {
    return createStore(
      rootReducer,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  } else {
    return createStore(rootReducer, initialState);
  }
};
