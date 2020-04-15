import * as React from "react";

export class Contact extends React.PureComponent {
	static fetchData() {
		return { name: "Contact Page" };
	}
	render() {
		return <h1>Contact Page Loaded</h1>;
	}
}
