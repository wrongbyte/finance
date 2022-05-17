import express from 'express';
import {
	registerTransaction,
	getChargeback,
	getHistory,
} from '../controllers/transactionControllers';

//TODO: change methods
const transactionRouter = express.Router();
transactionRouter.post('/register', registerTransaction);
transactionRouter.post('/chargeback', getChargeback);
transactionRouter.get('/history', getHistory);
