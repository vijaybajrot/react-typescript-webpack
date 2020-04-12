import * as React from "react";
import * as moment from "moment";

import { addView, connector } from "@app/utils/redux";

import style from "./style.scss";

function reducer(state = {}, action) {
	switch (action.type) {
		case "INIT_VIEW":
			return { Page: "Home" };
		default:
			return state;
	}
}

addView("home", reducer);

class HomePage extends React.PureComponent<any> {
	static fetchData({ store }) {
		console.log(moment().format("DD-MM-YYYY"));
		return store.dispatch({ type: "INIT_VIEW", view: "home" });
	}
	render() {
		//console.log({ page: this.props });
		if (this.props.loading === true) return "Loading page";
		return <div className={style.HomeHeading}>Home Page Updated</div>;
	}
}

export const Home = connector("home", HomePage);
