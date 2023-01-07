import { AppError } from '../error';
import { StatusCodes } from 'http-status-codes';
import { createAccount, findAccountByDocument, signTokens } from '../services/accountService';
import { v4 as uuid } from 'uuid';
import { Account } from '../entities/Account';

export const registerAccount = async (payload: Account) => {
	const { document } = payload;
	const existingAccount = await findAccountByDocument({ document });

	if (existingAccount) {
		throw new AppError("There's already an user with this document", StatusCodes.BAD_REQUEST);
	}

	return await createAccount({
		...payload,
		accountUUID: uuid(),
	});
};

export const authenticateAccount = async (document, password) => {
	const account = await findAccountByDocument({ document });
	if (!account || !(await Account.comparePasswords(password, account.password))) {
		throw new AppError('Invalid document or password', StatusCodes.BAD_REQUEST);
	}

	return await signTokens(account);
};
