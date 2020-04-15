import * as React from "react";

import { addView, connector } from "@app/utils/redux";

function reducer(state = {}, action) {
	switch (action.type) {
		case "INIT_VIEW":
			return { Page: "About us", some: true };
		default:
			return state;
	}
}

addView("about", reducer);

class AboutPage extends React.PureComponent {
	static fetchData({ store }) {
		return store.dispatch({ type: "INIT_VIEW", view: "about" });
	}
	render() {
		if (this.props.loading === true) return "Loading about page";
		return <h1>About Page Loaded</h1>;
	}
}
export const About = connector("about", AboutPage);
