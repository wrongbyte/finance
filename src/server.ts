import express from 'express';
import { authMiddleware } from './middlewares/authMiddleware';
import morganMiddleware from './middlewares/morganMiddleware';
import accountRouter from './routers/accountRouter';
import transactionRouter from './routers/transactionRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';
import cookieParser from 'cookie-parser';
import { refreshTokenController } from './controllers/authController';
import chargebackRouter from './routers/chargebackRouter';

export default () => {
	const app = express();
	app.use(morganMiddleware);
	app.use(cookieParser());
	app.use(express.json());
	app.use('/account', accountRouter);
	app.use(authMiddleware);
	app.use('/transaction', transactionRouter);
	app.use('/chargeback', chargebackRouter);
	app.use('/refresh', refreshTokenController);
	app.use(errorMiddleware);
	return app;
};
