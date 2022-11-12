import * as yup from 'yup';

export async function validateCreateTransaction(payload) {
	const schema = yup.object({
		sourceAccountUUID: yup.string().uuid().required(),
		destinationAccountDocument: yup
			.string()
			.matches(/^[0-9]{11}$/, 'Invalid value for document')
			.required(),
		amount: yup.number().positive().required(),
	});

	return await schema.validate(payload);
}
