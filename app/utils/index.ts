export * from "./redux";

import memoize from "@lib/memoize";

export const bindMethod: Function = memoize(
  (that, method, ...args) => method && method.bind(that, ...args)
);

export function bind<R>(that, methodName, ...args) {
  return bindMethod(that, that[methodName], ...args) as R;
}
