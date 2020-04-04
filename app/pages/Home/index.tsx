import * as React from "react";

import style from "./style.scss";

export class Home extends React.PureComponent {
  static fetchData() {
    return { name: "home" };
  }
  render() {
    return <h1 className={style.HomeHeading}>Home Page Updated</h1>;
  }
}
