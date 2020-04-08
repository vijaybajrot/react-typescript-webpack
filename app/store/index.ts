import { createStore } from "redux";

import reducer from "./reducer";

export const store = (initialState) => {
  if (
    process.env.NODE_ENV === "development" &&
    global.__REDUX_DEVTOOLS_EXTENSION__ &&
    global.__REDUX_DEVTOOLS_EXTENSION__()
  ) {
    return createStore(
      reducer,
      initialState,
      global.__REDUX_DEVTOOLS_EXTENSION__()
    );
  } else {
    return createStore(reducer, initialState);
  }
};
