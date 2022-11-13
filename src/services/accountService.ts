import { Account } from '../entities/Account';
import { AppDataSource } from '../config/data-source';
import redisClient from '../config/redis';
import { signJWT } from '../utils/jwt';
import { formatterBRL } from '../utils/money';

const accountRepository = AppDataSource.getRepository(Account);

interface FormattedAccount extends Omit<Account, 'balance'> {
	balance: number | string;
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
}): Promise<Account | undefined> => {
	return await accountRepository.findOneBy({ document });
};

export const findAccountByUUID = async (uuid: string) => {
	const account = await accountRepository.findOneBy({ accountUUID: uuid });
	delete account.password;
	delete account.id;
	return account;
};

export const signTokens = async (account: Account) => {
	redisClient.set(account.accountUUID, JSON.stringify(account), 'EX', 30 * 60);

	const access_token = signJWT({ sub: account.accountUUID }, 'ACCESSTOKEN_PRIVATE_KEY', {
		expiresIn: `${parseInt(process.env.ACCESS_TOKEN_TIMEOUT)}m`,
	});

	const refresh_token = signJWT({ sub: account.accountUUID }, 'REFRESHTOKEN_PRIVATE_KEY', {
		expiresIn: `${parseInt(process.env.REFRESH_TOKEN_TIMEOUT)}m`,
	});

	return { access_token, refresh_token };
};
