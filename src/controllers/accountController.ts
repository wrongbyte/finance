import { AppError } from '../error';
import { StatusCodes } from 'http-status-codes';
import {
	createAccount,
	executeTransaction,
	findAccountByDocument,
	findAccountByUUID,
	signTokens,
	updateAccountBalance,
} from '../services/accountService';
import { v4 as uuid } from 'uuid';
import { Account } from '../entities/Account';
import { createTransaction } from '../services/transactionService';
import { AppDataSource } from '../config/data-source';

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

export const processTransaction = async (
	sourceAccountUUID: string,
	destinationAccountDocument: string,
	transactionAmount: number,
) => {
	const accountSource = await findAccountByUUID(sourceAccountUUID);

	if (accountSource.balance < transactionAmount) {
		throw new AppError('Insufficient balance', StatusCodes.BAD_REQUEST);
	}

	const accountDestination = await findAccountByDocument({
		document: destinationAccountDocument,
	});

	if (accountDestination.document === accountSource.document) {
		throw new AppError('Invalid destination account', StatusCodes.BAD_REQUEST);
	}

	const destinationAccountUUID = accountDestination.accountUUID;

	await executeTransaction(
		accountSource.accountUUID,
		accountDestination.accountUUID,
		transactionAmount,
	);

	const transactionLog = await createTransaction({
		sourceAccountUUID,
		destinationAccountUUID,
		amount: transactionAmount,
	});

	return transactionLog;
};
