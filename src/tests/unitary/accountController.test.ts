import { registerAccount } from '../../controllers/accountController';
import * as accountService from '../../services/accountService';
import { userDbReturn, userInputCreate } from '../mock/user';
import { AppError } from '../../error';

describe('Registering a new account general cases', () => {
	jest.spyOn(accountService, 'createAccount').mockImplementationOnce(
		async () => userDbReturn as any,
	);

	it('should create a new account if no account with the same document exists', async () => {
		jest.spyOn(accountService, 'findAccountByDocument').mockImplementationOnce(
			async () => null,
		);
		const result = await registerAccount(userInputCreate as any);
		expect(result).toEqual(userDbReturn);
	});

	it('should return an error if an account already exists', async () => {
		jest.spyOn(accountService, 'findAccountByDocument').mockImplementationOnce(
			async () => userDbReturn as any,
		);

		const duplicateAccountError = new AppError(
			"There's already an user with this document",
			400,
		);

		expect(async () => registerAccount(userInputCreate as any)).rejects.toThrow(
			duplicateAccountError,
		);
	});
});
