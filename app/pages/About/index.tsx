import * as React from "react";

export class About extends React.PureComponent {
  static fetchData() {
    return { name: "about page" };
  }
  render() {
    return <h1>About Page Loaded</h1>;
  }
}
