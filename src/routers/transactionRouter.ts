import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { registerTransaction } from '../controllers/transactionController';
import { validateCreateTransaction } from '../validations/transactionValidation';

const transactionRouter = express.Router();
transactionRouter.post('/', async (request, response, next) => {
	try {
		let { sourceAccountUUID, destinationAccountDocument, amount } =
			await validateCreateTransaction({
				sourceAccountUUID: response.locals.user.accountUUID,
				...request.body,
			});

		amount *= 100;

		const transaction = await registerTransaction({
			sourceAccountUUID,
			destinationAccountDocument,
			amount,
		});

		response.send({
			status: StatusCodes.OK,
			data: transaction,
		});
	} catch (error) {
		next(error);
	}
});
// transactionRouter.post('/chargeback', getChargeback);
// transactionRouter.get('/history', getHistory);

export default transactionRouter;
