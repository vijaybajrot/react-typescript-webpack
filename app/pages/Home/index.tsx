import * as React from "react";

export class Home extends React.PureComponent {
  static fetchData() {
    return { name: "home" };
  }
  render() {
    return <h1>Home Page Updated</h1>;
  }
}
