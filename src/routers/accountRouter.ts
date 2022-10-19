import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import {
	registerAccount,
	balanceAccount,
} from '../controllers/accountController';
import { refreshTokenController } from '../controllers/authController';
import { authMiddleware, loginMiddleware } from '../middlewares/authMiddleware';

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
accountRouter.post('/login', loginMiddleware)
accountRouter.get('/refresh', refreshTokenController);
accountRouter.use(authMiddleware);
accountRouter.get('/balance', balanceAccount);

export default accountRouter;
