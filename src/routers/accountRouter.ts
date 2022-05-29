import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import {
	registerAccount,
	authenticateAccount,
	balanceAccount,
} from '../controllers/account.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const accountRouter = express.Router();
accountRouter.post('/create', async (request, response, next) => {
	registerAccount(request.body)
		.then(() =>
			response.send({
				status: StatusCodes.CREATED,
				message: ReasonPhrases.CREATED,
			}),
		)
		.catch(next);
});
accountRouter.get('/auth', authenticateAccount);
accountRouter.use(authMiddleware);
accountRouter.get('/balance', balanceAccount);

export default accountRouter;
