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

export async function validateDatesHistory(payload) {
	const schema = yup.object({
		sourceAccountUUID: yup.string().uuid().required(),
		startDate: yup.date().max(new Date(), 'Invalid start date'),
		endDate: yup
			.date()
			.test('same-dates', 'Start and end date must be different', (value, ctx) => {
				const { startDate } = ctx.parent;
				if (startDate && value) {
					return value.getTime() !== startDate.getTime();
				}
				return true
			}),
	});

	return await schema.validate(payload);
}
