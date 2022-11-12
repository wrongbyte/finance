import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { refreshTokenController } from '../controllers/authController';
import { authMiddleware, loginMiddleware } from '../middlewares/authMiddleware';
import { validateLoginPayload } from '../validations/authValidation';

const accountRouter = express.Router();

accountRouter.get('/', async (request, response, next) => {});

accountRouter.get('/refresh', refreshTokenController);
accountRouter.use(authMiddleware);

export default accountRouter;
