import * as React from 'react';
import Card from 'react-bootstrap/Card';

import { addView, connector } from '@app/utils/redux';
import { graphQL, gql } from '@app/utils/api';

import style from './style.scss';

function reducer(state = {}, action) {
	switch (action.type) {
		case 'INIT_VIEW':
		case 'SET_ITEMS':
			return { items: action.data };
		default:
			return state;
	}
}

addView('home', reducer);

const POST_QUERY = gql`
	query {
		allPosts {
			id
			title
			body
			author: user {
				name
			}
		}
	}
`;

class HomePage extends React.PureComponent<any> {
	static async fetchData({ store }) {
		//return store.dispatch({ type: 'INIT_VIEW', view: 'home', data: [] });
		const { allPosts } = await graphQL<{ allPosts: Array<any> }, any>(
			POST_QUERY,
		);
		return store.dispatch({ type: 'INIT_VIEW', view: 'home', data: allPosts });
	}
	render() {
		if (this.props.loading === true) return 'Loading page';
		const { items } = this.props;
		return (
			<div>
				{!!items &&
					items.map(item => {
						return (
							<Card key={item.id} className={style.ArticleRow}>
								<Card.Body>
									<Card.Title>{item.title}</Card.Title>
									<Card.Subtitle className='mb-2 text-muted'>
										Posted By {item.author.name}
									</Card.Subtitle>
									<Card.Text>{item.body}</Card.Text>
									<Card.Link href='#'>View Full Article</Card.Link>
								</Card.Body>
							</Card>
						);
					})}
			</div>
		);
	}
}
export const Home = connector('home', HomePage);
