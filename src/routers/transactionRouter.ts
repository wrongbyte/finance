import express from 'express';
import { registerTransaction } from '../controllers/transactionController';
import { validateCreateTransaction } from '../validations/transactionValidation';

const transactionRouter = express.Router();
transactionRouter.post('/', async (request, response, next) => {
	try {
		console.log({
			sourceAccountUUID: response.locals.user.accountUUID,
			...request.body,
		});
		const { sourceAccountUUID, destinationAccountDocument, amount } =
			await validateCreateTransaction({
				sourceAccountUUID: response.locals.user.accountUUID,
				...request.body,
			});
		// const transaction = await

		console.log(sourceAccountUUID, destinationAccountDocument, amount);
	} catch (error) {
		next(error);
	}
});
// transactionRouter.post('/chargeback', getChargeback);
// transactionRouter.get('/history', getHistory);

export default transactionRouter;
