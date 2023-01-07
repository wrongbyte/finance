import { AppError } from '../../error';

export const chargebackLog = {
	transactionUUID: '3b493e8b-e6c5-4606-84a0-9eb826de86b8',
	id: 5,
	createdAt: '2022-12-25T19:43:14.019Z',
};

export const chargebackLogs = [
	{
		transactionUUID: 'a1b70898-7943-4d5e-a4f2-9b7968f15b19',
		id: 5,
		createdAt: '2022-12-25T19:43:14.019Z',
	},
	{
		transactionUUID: 'b5bca6f6-cc22-4032-8f4b-20bbef183f6',
		id: 5,
		createdAt: '2022-12-25T19:43:14.019Z',
	},
];

export const invalidAccountError = new AppError('Invalid account', 400);
export const transactionNotFoundError = new AppError('Transaction not found', 400);
export const duplicatedChargebackError = new AppError(
	'A chargeback has already been made for this transaction',
	400,
);
export const invalidDestinationAccountError = new AppError('Invalid destination account', 400);
export const unavailableChargebackError = new AppError('Chargeback unavailable at the moment', 400);
