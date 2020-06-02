import { createStore as createReduxStore } from 'redux';

import reducer from './reducer';

export const createStore = initialState => {
	if (
		process.env.NODE_ENV === 'development' &&
		(global as any).__REDUX_DEVTOOLS_EXTENSION__ &&
		(global as any).__REDUX_DEVTOOLS_EXTENSION__()
	) {
		return createReduxStore(
			reducer,
			initialState,
			(global as any).__REDUX_DEVTOOLS_EXTENSION__(),
		);
	} else {
		return createReduxStore(reducer, initialState);
	}
};
