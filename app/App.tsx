import * as React from "react";
import { Route, Switch, Link } from "react-router-dom";

import Routes from "./routes";
import "./style.scss";

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About Us</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  );
}

export default class App extends React.PureComponent {
  render() {
    return (
      <>
        <Header />
        <Switch>
          {Routes.map(({ component, ...routeProps }, index) => {
            return <Route key={index} component={component} {...routeProps} />;
          })}
        </Switch>
      </>
    );
  }
}
