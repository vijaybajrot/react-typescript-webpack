const appMiddlewares = [];

export function addMiddleware(name: string, fn: Function) {
	appMiddlewares[name] = fn;
}

export function middlewares() {
	return appMiddlewares;
}
