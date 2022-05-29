import express from 'express';
import { Request, Response } from 'express';
import { authMiddleware } from './middlewares/authMiddleware';
import morganMiddleware from './middlewares/morganMiddleware';
import accountRouter from './routers/accountRouter';
import transactionRouter from './routers/transactionRouter';

export default () => {
	const app = express();
	app.use(morganMiddleware);
	app.use(express.json());
	app.use('/account', accountRouter);
	app.use(authMiddleware);
	app.use('/transaction', transactionRouter);
	// app.use((request: Request, res: Response, next) => {
	// 	return res.status(404)
	// })
	return app;
};
