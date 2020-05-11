export const cache: { [key: string]: any } = {};

function env<V>(key: string, defaultValue?: V): V {
	if (cache[key]) return cache[key];

	if (!(key in process.env)) {
		if (defaultValue !== undefined) return defaultValue;
		throw new Error(`${key} not found in process.env`);
	}

	cache[key] = process.env[key];

	return cache[key];
}

export default env;
