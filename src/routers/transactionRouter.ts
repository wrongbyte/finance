import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { getHistory, registerTransaction } from '../controllers/transactionController';
import {
	validateCreateTransaction,
	validateDatesHistory,
} from '../validations/transactionValidation';

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

transactionRouter.get('/', async (request, response, next) => {
	try {
		const { startDate, endDate, sourceAccountUUID } = await validateDatesHistory({
			sourceAccountUUID: response.locals.user.accountUUID,
			...request.query,
		});

		const history = await getHistory(startDate, endDate, sourceAccountUUID);

		response.send({
			status: StatusCodes.OK,
			data: history,
		});
	} catch (error) {
		next(error);
	}
});

// transactionRouter.post('/chargeback', getChargeback);

export default transactionRouter;
