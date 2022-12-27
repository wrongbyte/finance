import * as accountService from '../../services/accountService';
import { registerAccount, authenticateAccount } from '../../controllers/accountController';
import { userDbReturn, userInputCreate } from '../mock/user';
import { AppError } from '../../error';
import { Account } from '../../entities/Account';

const duplicateAccountError = new AppError("There's already an user with this document", 400);
const invalidAccountError = new AppError('Invalid document or password', 400);

describe('Registering a new account', () => {
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

		expect(async () => registerAccount(userInputCreate as any)).rejects.toThrow(
			duplicateAccountError,
		);
	});
});

describe('Authenticating an account', () => {
	it("should return an error if the account doesn't exists", () => {
		jest.spyOn(accountService, 'findAccountByDocument').mockImplementationOnce(
			async () => null,
		);

        expect(async () => authenticateAccount(userInputCreate.document, userInputCreate.password)).rejects.toThrow(
			invalidAccountError,
		);
	});

    it ('should return an error if the password is wrong', () => {
        expect(async () => Account.comparePasswords('1234', userInputCreate.password)).rejects.toThrow(
			invalidAccountError,
		);
    })
});
