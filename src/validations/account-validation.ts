import * as yup from 'yup';

export async function validateCreateAccount(payload) {
	const schema = yup.object({
		document: yup
			.string()
			.matches(/^[0-9]{11}$/, 'Invalid value for document')
			.required(),
		firstName: yup.string().required().min(2).max(32),
		lastName: yup.string().required().min(2).max(32),
		balance: yup.string().required(),
		password: yup.string().required().min(8).max(32),
	});

	return await schema.validate(payload);
}

export async function validateLoginPayload(payload) {
	const schema = yup.object({
		document: yup
			.string()
			.matches(/^[0-9]{11}$/, 'Invalid value for document')
			.required(),
		password: yup.string().required().min(8).max(32),
	});

	return await schema.validate(payload);
}
