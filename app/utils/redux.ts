import { connect } from "react-redux";

export const views = {};
export function addView(view, reducer) {
  views[view] = reducer;
}

export function connector(view, component, fn: Function = null) {
  return connect((state: any) => {
    const props = state.view[view] || { loading: true };
    return fn !== null ? { ...props, ...fn(state, props) } : props;
  })(component);
}
