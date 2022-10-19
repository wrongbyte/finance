import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { registerAccount, balanceAccount } from '../controllers/accountController';
import { refreshTokenController } from '../controllers/authController';
import { authMiddleware, loginMiddleware } from '../middlewares/authMiddleware';
import { validateCreateAccount } from '../validations/account-validation';

const accountRouter = express.Router();
accountRouter.post('/', async (request, response, next) => {
	try {
		const accountPayload = await validateCreateAccount(request.body);
		await registerAccount(accountPayload as any);
		response.send({
			status: StatusCodes.CREATED,
			message: ReasonPhrases.CREATED,
		});
	} catch (error) {
		next(error);
	}
});

accountRouter.post('/login', loginMiddleware);
accountRouter.get('/refresh', refreshTokenController);
accountRouter.use(authMiddleware);
accountRouter.get('/balance', balanceAccount);

export default accountRouter;
