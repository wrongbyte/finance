import { StatusCodes } from 'http-status-codes';
import { AppError } from '../error';
import { findAccountByDocument } from '../services/accountService';
import { updateAccountBalance } from './accountController';

const formatterBRL = new Intl.NumberFormat('pt-BR', {
	maximumSignificantDigits: 2,
	style: 'currency',
	currency: 'BRL',
});

export const registerTransaction = async ({
	sourceAccountUUID,
	destinationAccountDocument,
	amount,
}: {
	sourceAccountUUID: string;
	destinationAccountDocument: string;
	amount: number;
}) => {
	const destinationAccount = await findAccountByDocument({
		document: destinationAccountDocument,
	});

	if (!destinationAccount) {
		throw new AppError('No account found with this document', StatusCodes.BAD_REQUEST);
	}

	const transaction = await updateAccountBalance(sourceAccountUUID, destinationAccount, amount);
};

// export const getChargeback = async (request: Request, response: Response) => {
// 	return response.status(200).json({ message: 'get chargeback' });
// };

// export const getHistory = async (request: Request, response: Response) => {
// 	return response.status(200).json({ message: 'get history' });
// };
