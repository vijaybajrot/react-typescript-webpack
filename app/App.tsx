import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Title, Meta } from 'react-head';
import Container from 'react-bootstrap/Container';

import routes from '@app/routes';
import Header from '@app/components/Header';

import './app.scss';

export function inspectError(err: any) {
	if (process.env.NODE_ENV === 'production') {
		return 'INTERNAL_ERROR';
	} else if (!err) {
		return 'INTERNAL_ERROR';
	} else if (Array.isArray(err)) {
		return err.map(inspectError);
	} else if (err instanceof Error) {
		return err.stack.split('\n') || err.toString();
	} else {
		return err;
	}
}

export default class App extends React.PureComponent {
	static routes = routes;

	static getDerivedStateFromError(error) {
		return {
			error: {
				code: error.code === '404' ? '404' : '500',
				data: inspectError(error),
			},
		};
	}

	state = {
		error: null,
	};

	render() {
		const error = this.state.error || (this.props as any).error;
		return (
			<>
				<Title>React Head</Title>
				<Meta name='example' content='whatever' />
				{error ? (
					<pre>{JSON.stringify(error, null, 2)}</pre>
				) : (
					<Container>
						<Header />
						<main>
							<Switch>
								{routes.map(
									({ component: Component, ...routeProps }, index) => {
										return (
											<Route
												key={index}
												component={Component}
												{...routeProps}
											/>
										);
									},
								)}
							</Switch>
						</main>
					</Container>
				)}
			</>
		);
	}
}
