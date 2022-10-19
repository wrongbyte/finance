import { AppError } from '../error';
import { StatusCodes } from 'http-status-codes';
import { createAccount, findAccountByDocument } from '../services/accountService';
import { v4 as uuid } from 'uuid';
import { Account } from '../entities/Account';

export const registerAccount = async (payload: Account) => {
	const { document } = payload
	const existingAccount = await findAccountByDocument({ document });
	
	if (existingAccount) {
		throw new AppError("There's already an user with this document", StatusCodes.BAD_REQUEST);
	}
	await createAccount({
		...payload,
		accountUUID: uuid(),
	});
};

export const authenticateAccount = async (request, response) => {
	return response.status(200).json({ message: 'authenticate account' });
};

export const balanceAccount = async (request, response) => {
	return response.status(200).json({ message: 'authenticate account' });
};
