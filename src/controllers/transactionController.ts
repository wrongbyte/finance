import { StatusCodes } from 'http-status-codes';
import { AppError } from '../error';
import { findAccountByDocument, findAccountByUUID } from '../services/accountService';
import { executeTransaction, getTransactionLogsByRangeDate } from '../services/transactionService';
import { Account } from '../entities/Account';

export const registerTransaction = async ({
	sourceAccountUUID,
	destinationAccountDocument,
	amount,
}: {
	sourceAccountUUID: string;
	destinationAccountDocument: string;
	amount: number;
}) => {
	const sourceAccount = await findAccountByUUID(sourceAccountUUID);
	
	if (!sourceAccount) {
		throw new AppError('Invalid account', StatusCodes.BAD_REQUEST);
	}

	if (sourceAccount.balance < amount) {
		throw new AppError('Insufficient balance', StatusCodes.BAD_REQUEST);
	}

	const destinationAccount = await findAccountByDocument({
		document: destinationAccountDocument,
	});

	if (!destinationAccount) {
		throw new AppError('No account found with this document', StatusCodes.BAD_REQUEST);
	}

	if (destinationAccount.document === sourceAccount?.document) {
		throw new AppError('Invalid destination account', StatusCodes.BAD_REQUEST);
	}

	const transactionLog = await executeTransaction(sourceAccount as Account, destinationAccount, amount);

	if (!transactionLog) {
		throw new AppError('Error during transaction. Try again', StatusCodes.INTERNAL_SERVER_ERROR);
	}

	return transactionLog
};

export const getHistory = async (startDate, endDate, sourceAccountUUID) => {
	return getTransactionLogsByRangeDate(startDate, endDate, sourceAccountUUID);
};

// export const getChargeback = async (request: Request, response: Response) => {
// 	return response.status(200).json({ message: 'get chargeback' });
// };
