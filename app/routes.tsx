import { RouteProps } from 'react-router-dom';

import { loadable } from '@app/lib/loadable';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RouterProps extends RouteProps {}

const routes: Array<RouterProps> = [
	{
		path: '/',
		component: loadable(async () => (await import('@app/pages/Home')).Home),
		exact: true,
	},
	{
		path: '/about',
		component: loadable(async () => (await import('@app/pages/About')).About),
	},
	{
		path: '/contact',
		component: loadable(
			async () => (await import('@app/pages/Contact')).Contact,
		),
	},
	{
		path: '/posts/create',
		component: loadable(
			async () => (await import('@app/pages/Post/create')).CreatePost,
		),
	},
	{
		path: '/posts/:id',
		component: loadable(async () => (await import('@app/pages/Post')).default),
	},
];

export default routes;
