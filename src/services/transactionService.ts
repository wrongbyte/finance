import { AppDataSource } from '../config/data-source';
import { Transaction } from '../entities/Transaction';
import { formatterBRL } from '../utils/money';
import { v4 as uuid } from 'uuid';
import { Account } from '../entities/Account';
import { Between, LessThan, MoreThan } from 'typeorm';

const transactionRepository = AppDataSource.getRepository(Transaction);

export interface FormattedTransactionLog extends Omit<Transaction, 'amount' | 'id' | 'createdAt'> {
	amount: number | string;
	id?: number;
	createdAt: string | Date;
}

export const findTransactionByUUID = async (uuid: string) : Promise<FormattedTransactionLog | null> => {
	const transaction = await transactionRepository.findOneBy({ transactionUUID: uuid }) as FormattedTransactionLog;
	delete transaction?.id;
	return transaction;
};

export const executeTransaction = async (accountSource : Account, accountDestination : Account, amount : number) => {
	let destinationUUID = accountDestination.accountUUID;
	let sourceUUID = accountSource.accountUUID;

	let transactionLog : null | FormattedTransactionLog = null;

	await AppDataSource.transaction(async (transactionalEntityManager) => {
		const sourceAccountUpdatedBalance = accountSource.balance - amount;
		await transactionalEntityManager.update(
			Account,
			{ accountUUID: sourceUUID },
			{ balance: sourceAccountUpdatedBalance },
		);

		const destinationAccountUpdatedBalance = accountDestination.balance + amount;
		await transactionalEntityManager.update(
			Account,
			{ accountUUID: destinationUUID },
			{ balance: destinationAccountUpdatedBalance },
		);

		transactionLog = await transactionalEntityManager.save(
			Transaction,
			transactionRepository.create({
				transactionUUID: uuid(),
				sourceAccountUUID: sourceUUID,
				destinationAccountUUID: destinationUUID,
				amount,
			}),
		) as FormattedTransactionLog;

		transactionLog.amount = formatterBRL.format(transactionLog.amount as number / 100);
		transactionLog.createdAt = transactionLog.createdAt.toLocaleString('pt-BR');

		delete transactionLog.id;
	});

	return transactionLog;
};

export const getTransactionLogsByRangeDate = async (startDate, endDate, sourceAccountUUID) => {
	let rangeQuery = {};
	if (startDate && endDate) {
		rangeQuery = { createdAt: Between(startDate, endDate) };
	} else if (startDate || endDate) {
		rangeQuery = startDate
			? { createdAt: MoreThan(startDate) }
			: { createdAt: LessThan(endDate) };
	}

	let transactionLogs = await transactionRepository.find({
		where: {
			sourceAccountUUID,
			...rangeQuery,
		},
	}) as FormattedTransactionLog[];

	transactionLogs.map((log) => {
		delete log.id;
		log.createdAt = new Date(log.createdAt as string).toLocaleString('pt-BR');
		log.amount = formatterBRL.format(log.amount as number / 100) as any;
	});

	return transactionLogs;
};
