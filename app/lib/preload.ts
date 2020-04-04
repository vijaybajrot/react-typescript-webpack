import { matchPath } from "react-router";

export default async function preload(component, context, match = null) {
  let fetchData;
  let loads = [];
  if (!context.hydrate) {
    if (component.fetchData) {
      fetchData = component.fetchData(context, match);
    }
    if (fetchData && component.waitForFetchData) await fetchData;
  }

  let routes = component.routes;
  if (component.routes && component.routes.constructor === Function) {
    routes = routes(context, match);
  }
  const pathname = context.location.pathname;
  if (Array.isArray(routes)) {
    let matched = null;
    for (let i = 0; i < routes.length; i++) {
      const load = getLoad(
        routes[i],
        context,
        matched === null ? (matched = matchPath(pathname, routes[i])) : null
      );
      if (load) loads.push(load);
    }
  } else if (routes && routes.constructor === Object) {
    for (const key in routes) {
      const load = getLoad(
        routes[key],
        context,
        matchPath(pathname, routes[key])
      );
      if (load) loads.push(load);
    }
  }
  loads = Promise.all(loads);
  return !component.waitForFetchData && fetchData
    ? Promise.all([fetchData, loads])
    : loads;
}

function getLoad(route, context, match) {
  const component =
    route.component || route.render
      ? match && (route.component || route.render)
      : route.children;
  if (!component) {
    return false;
  } else if (component.load) {
    return component.load().then((_component) => {
      component._component = _component;
      return preload(_component, context, match);
    });
  } else {
    return preload(component, context, match);
  }
}
