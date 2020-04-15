import { combineReducers } from "redux";

import { views } from "@app/utils/redux";

function view(state = {}, action) {
	switch (action.type) {
		case "INIT_VIEW": {
			return {
				...state,
				[action.view]: views[action.view](undefined, action),
			};
		}
		case "TERM_VIEW": {
			const nextState = { ...state };
			delete nextState[action.view];
			return nextState;
		}
		default: {
			let changed = false;
			const next = Object.create(null);
			for (const key in state) {
				next[key] = views[key](state[key], action);
				changed = changed || next[key] !== state[key];
			}

			return changed ? next : state;
		}
	}
}

function error(state = null, action) {
	switch (action.type) {
		case "APP_ERROR":
			return action.error;
		case "CLEAN_ERROR":
			return null;
		default:
			return state;
	}
}

function session(state = null, action) {
	switch (action.type) {
		case "INIT_APP":
		case "APP_SIGN_OUT":
		case "APP_LOGIN_DONE":
		case "APP_SIGNUP_DONE": {
			return action.session || state;
		}
		default:
			return state;
	}
}

export default combineReducers({
	view,
	error,
	session,
});
