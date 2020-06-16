import * as React from 'react';

import Loading from '@app/components/Loading';

declare let __webpack_modules__: any;
declare function __webpack_require__(...args): any;

function Loader(props) {
	const { id, loader, load, forwardedProps, forwardedRef } = props;
	let [component, setComponent] = React.useState(() => props.component);
	/* eslint-disable no-undef, babel/camelcase */
	React.useEffect(() => {
		if (id && __webpack_modules__[id] && !!component) return;
		load().then(component => setComponent(() => component));
	}, [id, component, load]);
	component =
		id && __webpack_modules__[id] ? __webpack_require__(id).default : component;
	/* eslint-enable no-undef, babel/camelcase */
	if (!component) return loader;
	let componentProps = forwardedProps;
	if (forwardedRef) {
		if (forwardedProps) {
			componentProps = { ...props, ref: forwardedRef };
		} else {
			componentProps = { ref: forwardedRef };
		}
	}
	return React.createElement(component, componentProps);
}

Loader.defaultProps = {
	loader: <Loading />,
};

type LoadableFunction<T = any> = (
	load: () => T,
	forwardRef?: boolean,
	loader?: JSX.Element,
	id?: any,
) => any;

export const loadable: LoadableFunction = (
	load,
	forwardRef = false,
	loader = <Loading />,
	id,
) => {
	function Component(props) {
		return (
			<Loader
				id={id}
				load={load}
				loader={loader}
				forwardedProps={props}
				component={(Component as any)._component}
			/>
		);
	}
	Component.displayName = 'LoadableComponent';
	const Loadable: any = forwardRef
		? // eslint-disable-next-line
		  React.forwardRef((props, ref) => (
				<Component {...props} forwardedRef={ref} />
		  ))
		: Component;

	Loadable.component = null;
	Loadable.load = load;

	return Loadable;
};
