import * as React from "react";

import style from "./style.scss";

export default function Loading() {
	return (
		<div className={style.spinner}>
			<span className={style.spinnerInner1}></span>
			<span className={style.spinnerInner1}></span>
			<span className={style.spinnerInner1}></span>
		</div>
	);
}
