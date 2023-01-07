import * as accountService from '../../services/accountService';
import * as chargebackService from '../../services/chargebackService';
import * as transactionService from '../../services/transactionService';
import { existingAccounts, userDbReturn } from '../mock/account';
import { transactionHistoryLog } from '../mock/transaction';
import { executeChargebackByUUID } from '../../controllers/chargebackController';
import { chargebackLog, chargebackLogs } from '../mock/chargeback';

const sourceAccountUUID = userDbReturn.accountUUID;
const transactionUUID = transactionHistoryLog[0].transactionUUID;

describe('Executing chargeback for account general cases', () => {
	jest.spyOn(accountService, 'findAccountByUUID').mockImplementation(
		async (accountUUID) =>
			existingAccounts.find((account) => account.accountUUID == accountUUID) as any,
	);
	jest.spyOn(chargebackService, 'createChargebackLog').mockImplementationOnce(
		async () => chargebackLog as any,
	);

	it('should successfully create a chargeback log', async () => {
		jest.spyOn(transactionService, 'executeTransaction').mockImplementationOnce(
			async () => null,
		);
		jest.spyOn(accountService, 'accountHasBalanceForTransaction').mockImplementationOnce(
			async () => true,
		);

		jest.spyOn(transactionService, 'findTransactionByUUID').mockImplementationOnce(
			async (transactionUUID) =>
				transactionHistoryLog.find((log) => log.transactionUUID == transactionUUID) as any,
		);

		jest.spyOn(chargebackService, 'findChargebackByTransactionUUID').mockImplementationOnce(
			async (transactionUUID) =>
				chargebackLogs.find((log) => log.transactionUUID == transactionUUID) as any,
		);

		const result = await executeChargebackByUUID(sourceAccountUUID, transactionUUID);
		expect(result).toBe(chargebackLog);
	});
});
