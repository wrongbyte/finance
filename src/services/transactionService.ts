import { AppDataSource } from '../config/data-source';
import { TransactionPayload } from '../types/Transaction';
import { Transaction } from '../entities/Transaction';
import { formatterBRL } from '../utils/money';
import { v4 as uuid } from 'uuid';

const transactionRepository = AppDataSource.getRepository(Transaction);

interface FormattedTransaction extends Omit<Transaction, 'amount'> {
	amount: number | string;
}

export const createTransaction = async (
	payload: TransactionPayload,
): Promise<FormattedTransaction> => {
	const transactionLog = (await transactionRepository.save(
		transactionRepository.create({ transactionUUID: uuid(), ...payload } as Transaction),
	)) as FormattedTransaction;

	transactionLog.amount = formatterBRL.format((transactionLog.amount as number) / 100);

	delete transactionLog.id;

	return transactionLog;
};
