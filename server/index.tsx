import * as path from "path";
import * as React from "react";
import { renderFile } from "ejs";
import * as express from "express";
import { Express } from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "@app/App";

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

//app.use(express.static("dist"));
app.set("view engine", "ejs");
app.engine("html", renderFile);
app.set("views", path.join(__dirname + "/views"));

app.get("**", (req, res) => {
  const data = {
    content: renderToString(
      <Provider store={store}>
        <StaticRouter>
          <App />
        </StaticRouter>
      </Provider>
    )
  };
  return res.render("index", data);
});

app.listen(3000, () => console.log("App running on port 3000"));
