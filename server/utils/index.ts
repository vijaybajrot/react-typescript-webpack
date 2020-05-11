import env from "./env";

export { env };

export function isDev() {
	return env("NODE_ENV") === "development";
}
