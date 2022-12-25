import { Account } from '../entities/Account';
import { AppDataSource } from '../config/data-source';
import redisClient from '../config/redis';
import { signJWT } from '../utils/jwt';
import { formatterBRL } from '../utils/money';

const accountRepository = AppDataSource.getRepository(Account);

export interface FormattedAccount extends Omit<Account, 'balance' | 'password' | 'id'> {
	balance: number | string;
	password?: string;
	id?: number;
}

export const createAccount = async (
	payload: Omit<Account, 'hashPassword'>,
): Promise<FormattedAccount> => {
	const newAccount = (await accountRepository.save(
		accountRepository.create(payload),
	)) as FormattedAccount;

	newAccount.balance = formatterBRL.format((newAccount.balance as number) / 100);

	delete newAccount.password;
	return newAccount;
};

export const findAccountByDocument = async ({
	document,
}: {
	document: string;
}): Promise<Account | null> => {
	return await accountRepository.findOneBy({ document });
};

export const findAccountByUUID = async (uuid: string) : Promise<FormattedAccount | null> => {
	const account = await accountRepository.findOneBy({ accountUUID: uuid }) as FormattedAccount;
	delete account?.password;
	delete account?.id;
	return account;
};

export const updateAccountBalance = async (accountUUID : string, updatedBalance : number) => {
	return await accountRepository.update({ accountUUID }, { balance: updatedBalance });
};

export const signTokens = async (account: Account) => {
	redisClient.set(account.accountUUID, JSON.stringify(account), 'EX', 3600000);

	const access_token = signJWT({ sub: account.accountUUID }, 'ACCESSTOKEN_PRIVATE_KEY', {
		expiresIn: `${parseInt(process.env.ACCESS_TOKEN_TIMEOUT)}m`,
	});

	const refresh_token = signJWT({ sub: account.accountUUID }, 'REFRESHTOKEN_PRIVATE_KEY', {
		expiresIn: `${parseInt(process.env.REFRESH_TOKEN_TIMEOUT)}m`,
	});

	return { access_token, refresh_token };
};
