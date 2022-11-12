import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { authenticateAccount, registerAccount } from '../controllers/accountController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateCreateAccount, validateLoginPayload } from '../validations/account-validation';
import { accessTokenCookieOptions } from '../controllers/authController';

const accountRouter = express.Router();
accountRouter.post('/', async (request, response, next) => {
	try {
		const accountPayload = await validateCreateAccount(request.body);
		const account = await registerAccount(accountPayload as any);

		response.send({
			status: StatusCodes.CREATED,
			data: account,
		});
	} catch (error) {
		next(error);
	}
});

accountRouter.post('/login', async (request, response, next) => {
	try {
		const { document, password } = await validateLoginPayload(request.body);

		const { access_token, refresh_token } = await authenticateAccount(document, password);
		response.cookie('access_token', access_token, accessTokenCookieOptions);
		response.cookie('refresh_token', refresh_token, accessTokenCookieOptions);

		response.send({ status: StatusCodes.OK, data: ReasonPhrases.OK });
	} catch (error) {
		next(error);
	}
});

accountRouter.get('/', authMiddleware, async (_, response, next) => {
	try {
		response.send({ status: StatusCodes.OK, data: response.locals.user });
	} catch (error) {
		next(error);
	}
});

export default accountRouter;
