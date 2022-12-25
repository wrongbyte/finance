import { AppDataSource } from '../config/data-source';
import { Chargeback } from '../entities/Chargeback';

const chargebackRepository = AppDataSource.getRepository(Chargeback);

export const findChargebackByTransactionUUID = async (uuid: string) => {
	const chargebackLog = await chargebackRepository.findOneBy({ transactionUUID: uuid });
	return chargebackLog;
};

export const createChargebackLog = async (transactionUUID) => {
	const chargebackLog = (await chargebackRepository.save(
		chargebackRepository.create({ transactionUUID }),
	));
	return chargebackLog;
};
