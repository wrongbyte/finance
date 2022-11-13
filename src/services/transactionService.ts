import { AppDataSource } from '../config/data-source';
import { Transaction } from '../entities/Transaction';
import { formatterBRL } from '../utils/money';
import { v4 as uuid } from 'uuid';
import { Account } from '../entities/Account';
import { findAccountByUUID } from './accountService';
import { Between } from 'typeorm';

const transactionRepository = AppDataSource.getRepository(Transaction);

export const executeTransaction = async (sourceUUID, destinationUUID, amount) => {
	const accountSource = await findAccountByUUID(sourceUUID);
	const accountDestination = await findAccountByUUID(destinationUUID);

	let transactionLog = null;

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
		);

		transactionLog.amount = formatterBRL.format(transactionLog.amount / 100);

		delete transactionLog.id;
	});

	return transactionLog;
};

export const getTransactionLogsByRangeDate = async (startDate, endDate, sourceAccountUUID) => {
	const transactionLogs = await transactionRepository.find({
		where: {
			sourceAccountUUID,
			createdAt: Between(startDate, endDate),
		},
	});
	transactionLogs.map((log) => {
		delete log.id;
		log.amount = formatterBRL.format(log.amount / 100) as any;
	});

	return transactionLogs;
};
