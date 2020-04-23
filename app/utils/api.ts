import axios from "axios";

export function gql(strings: TemplateStringsArray, ...exprs: string[]): string {
	const result = [strings[0]];
	const len = exprs.length;
	for (let i = 0; i < len; i++) {
		result.push(exprs[i], strings[i + 1]);
	}
	return result.join("");
}

export function graphQL<T, V>(
	query: string,
	variables?: V,
	operationName?: string,
): Promise<T> {
	const method = query.indexOf("mutation") !== -1 ? "post" : "get";
	const dataKey: string = method === "post" ? "data" : "params";
	const requestOptions: any = {
		method,
		url: "/graphql",
		[dataKey]: {
			query,
			operationName,
			variables: variables ? JSON.stringify(variables) : undefined,
		},
	};

	const request = axios(requestOptions);
	//const result: { data?: T; error?: any } = {};
	return new Promise((resolve, reject) => {
		request.then(
			response => {
				if (response.status === 200) {
					const data = response.data.data;
					resolve(data);
				}
			},
			error => {
				console.error(error);
				reject(error);
			},
		);
	});
}
