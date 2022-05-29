import express from 'express';
import {
	registerTransaction,
	getChargeback,
	getHistory,
} from '../controllers/transactionController';

//TODO: change methods
const transactionRouter = express.Router();
transactionRouter.get('/register', registerTransaction);
transactionRouter.get('/chargeback', getChargeback);
transactionRouter.get('/history', getHistory);

export default transactionRouter;
