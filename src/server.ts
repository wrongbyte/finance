import express from 'express';
import { authMiddleware } from './middlewares/auth';
import morganMiddleware from './middlewares/morgan';
import accountRouter from './routers/accountRouter';

export default () => {
	const app = express();
	app.use(morganMiddleware);
	app.use(express.json());
	app.use('/account', accountRouter);
	app.use(authMiddleware);
	app.use('/transaction', )
	
	return app;
};
