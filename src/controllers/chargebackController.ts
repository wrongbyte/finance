import { StatusCodes } from "http-status-codes";
import { AppError } from "../error";
import { accountHasBalanceForTransaction, findAccountByUUID } from "../services/accountService";
import { executeTransaction, findTransactionByUUID } from "../services/transactionService";
import { createChargebackLog, findChargebackByTransactionUUID } from "../services/chargebackService";
import { Account } from "../entities/Account";

export const executeChargebackByUUID = async (sourceAccountUUID, transactionUUID) => {
	const sourceAccount = await findAccountByUUID(sourceAccountUUID);
	if (!sourceAccount) {
		throw new AppError('Invalid account', StatusCodes.BAD_REQUEST);
	}

	const transaction = await findTransactionByUUID(transactionUUID);
	if (!transaction) {
		throw new AppError('Transaction not found', StatusCodes.BAD_REQUEST);
	}

	const existingChargeback = await findChargebackByTransactionUUID(transactionUUID);

    if (existingChargeback) {
        throw new AppError('A chargeback has already been made for this transaction', StatusCodes.BAD_REQUEST);
    }

    const destinationAccountChargeback = sourceAccount;

    const sourceAccountChargeback = await findAccountByUUID(transaction.destinationAccountUUID);

    if (!sourceAccountChargeback) {
        throw new AppError('Invalid destination account', StatusCodes.BAD_REQUEST);
    }

    if (!await accountHasBalanceForTransaction(sourceAccountUUID, transaction.amount as number)) {
        throw new AppError('Chargeback unavailable at the moment', StatusCodes.BAD_REQUEST);
    }

    await executeTransaction(sourceAccountChargeback as Account, destinationAccountChargeback as Account, transaction.amount as number);

    const chargebackLog = await createChargebackLog(transaction.transactionUUID);

    return chargebackLog
}