import * as React from 'react';
import Form from 'react-bootstrap/Form';

import { useForm } from '@app/lib/hooks';

const PostForm: React.FC = props => {
	const [values, handleChange] = useForm({});

	React.useEffect(() => {
		console.log(values);
	}, [values]);
	return (
		<Form>
			<Form.Group controlId='exampleForm.ControlInput1'>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					name='email'
					type='email'
					placeholder='name@example.com'
					value={values.email || ''}
					onChange={handleChange}
				/>
			</Form.Group>
			<Form.Group controlId='exampleForm.ControlSelect1'>
				<Form.Label>Example select</Form.Label>
				<Form.Control
					as='select'
					name='select'
					defaultValue={3}
					onChange={handleChange}>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
				</Form.Control>
			</Form.Group>
			<Form.Group controlId='exampleForm.ControlSelect2'>
				<Form.Label>Example multiple select</Form.Label>
				<Form.Control as='select' multiple>
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</Form.Control>
			</Form.Group>
			<Form.Group controlId='exampleForm.ControlTextarea1'>
				<Form.Label>Example textarea</Form.Label>
				<Form.Control as='textarea' />
			</Form.Group>
		</Form>
	);
};

export class CreatePost extends React.PureComponent {
	render() {
		return <PostForm />;
	}
}
