import express from 'express';
import { Request, Response, NextFunction} from 'express';
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';
import {
	registerAccount,
	authenticateAccount,
	balanceAccount,
} from '../controllers/account.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const accountRouter = express.Router();
accountRouter.post('/create', async (request: Request, response: Response, next: NextFunction) => {
	await registerAccount(request.body);
	response.send({
		status: ReasonPhrases.CREATED,
		message: StatusCodes.CREATED
	})
});
accountRouter.get('/auth', authenticateAccount);
accountRouter.use(authMiddleware);
accountRouter.get('/balance', balanceAccount);

export default accountRouter;
