import axios from 'axios';

class CancelablePromise<T> extends Promise<T> {
	cancel: () => void;
}

export function gql(strings: TemplateStringsArray, ...exprs: string[]): string {
	const result = [strings[0]];
	const len = exprs.length;
	for (let i = 0; i < len; i++) {
		result.push(exprs[i], strings[i + 1]);
	}
	return result.join('');
}

export function makeCancelable<T>(promise: T, cancelFn: () => void) {
	const cancelablePromise: CancelablePromise<T> | any = promise;
	cancelablePromise.cancel = cancelFn;
	return cancelablePromise;
}

export function graphQL<T, V>(
	query: string,
	variables?: V,
	operationName?: string,
): Promise<T> {
	const method = query.indexOf('mutation') !== -1 ? 'post' : 'get';
	const dataKey: string = method === 'post' ? 'data' : 'params';
	const requestOptions: any = {
		method,
		url: 'http://localhost:5000/graphql',
		[dataKey]: {
			query,
			operationName,
			variables: variables ? JSON.stringify(variables) : undefined,
		},
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let request;
	return new Promise(resolve => {
		request = callAPI(resolve, requestOptions);
	});
}

function callAPI<T>(resolveFn: (T) => void, requestOptions: object) {
	const request = axios(requestOptions);
	request.then(
		response => {
			if (response.status === 200) {
				const data = response.data.data;
				resolveFn(data);
			}
		},
		error => {
			// eslint-disable-next-line no-console
			console.error(error);
		},
	);
}
