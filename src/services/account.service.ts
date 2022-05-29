import { Account } from '../entities/Account';
import { AppDataSource } from '../config/data-source';

const accountRepository = AppDataSource.getRepository(Account);

export const createAccount = async (payload: Account) => {
	return accountRepository.save(accountRepository.create(payload));
};

export const findAccountByDocument = async ({
	document,
}: {
	document: string;
}): Promise<Account | undefined> => {
	return await accountRepository.findOneBy({ document });
};
