import * as yup from 'yup';

export async function validateCreateTransaction(payload) {
	const schema = yup.object({
		sourceAccountUUID: yup.string().uuid().required(),
		destinationAccountDocument: yup
			.string()
			.matches(/^[0-9]{11}$/, 'Invalid value for document')
			.required(),
		amount: yup
			.number()
			.positive('Amount must be greater than zero')
			.test(
				'is-decimal',
				'Amount should be a decimal number',
				(value) => !(String(value).split('.')[1]?.length > 2),
			)
			.required(),
	});

	return await schema.validate(payload);
}
