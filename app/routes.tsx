import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home } from "@app/pages/Home";

export default function Routes() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
