import express from 'express';
import {
	createAccount,
	authenticateAccount,
	balanceAccount,
} from '../controllers/accountController';
import { authMiddleware } from '../middlewares/auth';

// TODO: change methods
const accountRouter = express.Router();
accountRouter.get('/create', createAccount);
accountRouter.get('/auth', authenticateAccount);
accountRouter.use(authMiddleware);
accountRouter.get('/balance', balanceAccount);

export default accountRouter;
