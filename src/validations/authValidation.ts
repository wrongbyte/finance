import * as yup from 'yup';

export async function validateLoginPayload(payload) {
	const schema = yup.object({
		document: yup
			.string()
			.matches(/^[0-9]{11}$/)
			.required(),
		password: yup.string().required().min(8).max(32),
	});

	return await schema.validate(payload);
}
