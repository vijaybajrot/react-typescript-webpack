import * as React from "react";
import { Route, Switch, Link } from "react-router-dom";

import Routes from "@app/routes";
import Header from "@app/components/Header";

import "./style.scss";

export default class App extends React.PureComponent {
  render() {
    return (
      <>
        <Header />
        <Switch>
          {Routes.map(({ component: Component, ...routeProps }, index) => {
            return <Route key={index} component={Component} {...routeProps} />;
          })}
        </Switch>
      </>
    );
  }
}
