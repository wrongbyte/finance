import express from 'express';
import {
	registerTransaction,
	getChargeback,
	getHistory,
} from '../controllers/transactionController';

const transactionRouter = express.Router();
transactionRouter.post('/register', async (request, response, next) => {
	try {
		const accountUUID = response.locals.user.accountUUID;
	} catch (error) {
		next(error);
	}
});
transactionRouter.post('/chargeback', getChargeback);
transactionRouter.get('/history', getHistory);

export default transactionRouter;
