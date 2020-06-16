import { useState  } from 'react';

export type FormValues = {
	[key: string]: any;
};

export type FormChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type FormChangeHandler = (e: FormChangeEvent) => void;

export type FormHook = [FormValues, FormChangeHandler];

const useForm = function (initialValues: FormValues = {}): FormHook {
	const [values, setValues] = useState<FormValues>(initialValues);

	const handleChange: FormChangeHandler = (event: FormChangeEvent) => {
		setValues({
			...values,
			[event.currentTarget.name]: event.currentTarget.value,
		});
	};

	return [values, handleChange];
};

export default useForm;
