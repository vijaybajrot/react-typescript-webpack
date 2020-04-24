import * as React from "react";

import { addView, connector } from "@app/utils/redux";
import { graphQL, gql } from "@app/utils/api";

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
		return store.dispatch({ type: "INIT_VIEW", view: "home" });
	}
	async componentDidMount() {
		const { hello } = await graphQL<{ hello: string }, any>(gql`
			query {
				hello
			}
		`);
		console.log(hello);
	}
	render() {
		//console.log({ page: this.props });
		if (this.props.loading === true) return "Loading page";
		return <div className={style.HomeHeading}>Home Page Updated</div>;
	}
}

export const Home = connector("home", HomePage);
