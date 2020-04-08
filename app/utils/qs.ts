import * as qs from "qs";

export function parseQuery(str: string): object {
  if (str.startsWith("?")) str = str.substring(1);
  if (!str) return {};
  return qs.parse(str, { arrayLimit: Infinity });
}

export function stringifyQuery(query: object): string {
  return "?" + qs.stringify(query);
}
