import * as React from "react";

import style from "./style.scss";
import { addView, connector } from "@app/utils/redux";

function reducer(state = {}, action) {
  switch (action.type) {
    case "INIT_VIEW":
      return { Page: "Home" };
    default:
      return state;
  }
}

addView("home", reducer);

class HomePage extends React.PureComponent {
  static fetchData({ store }) {
    return store.dispatch({ type: "INIT_VIEW", view: "home" });
  }
  render() {
    //console.log({ page: this.props });
    if (this.props.loading === true) return "Loading page";
    return <div className={style.HomeHeading}>Home Page Updated</div>;
  }
}

export const Home = connector("home", HomePage);
