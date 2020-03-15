import * as React from "react";
import { Switch, Route } from "react-router-dom";

import { Home } from "@app/pages/Home";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
