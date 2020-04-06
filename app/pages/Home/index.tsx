import * as React from "react";

import style from "./style.scss";
import { addView, connector } from "@app/utils";

function reducer(state = {}, action) {
  switch (action.type) {
    case "INIT_VIEW":
      return { Page: "Home" };
    default:
      return state;
  }
}

addView("Home", reducer);

class HomePage extends React.PureComponent {
  static fetchData({ store }) {
    return store.dispatch({ type: "INIT_VIEW", view: "Home" });
  }
  render() {
    //console.log({ page: this.props });
    //if (this.props.loading === true) return "Loading page";
    return <h1 className={style.HomeHeading}>Home Page Updated</h1>;
  }
}
export const Home = connector("Home", HomePage);
