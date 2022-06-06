import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Account } from '../entities/Account';
import { AppError } from '../error';
import { findAccountByDocument, signTokens } from '../services/account.service';
import {
	accessTokenCookieOptions,
	refreshTokenCookieOptions,
} from '../controllers/auth.controller';

export const authMiddleware = async (
	request: Request,
	response: Response,
	next,
) => {
	return response.status(StatusCodes.OK);
};

export const loginMiddleware = async (
	request: Request,
	response: Response,
	next,
) => {
	try {
		const { document, password } = request.body;	
		const account = await findAccountByDocument({ document });

		if (!account || !(await Account.comparePasswords(password, account.password))) {
			throw new AppError('Invalid document or password', StatusCodes.BAD_REQUEST);
		}

		const { access_token, refresh_token } = await signTokens(account);

		response.cookie('access_token', access_token, accessTokenCookieOptions);
		response.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
		response.cookie('logged_in', true, {
			...accessTokenCookieOptions,
			httpOnly: false,
		});
		response.send({
			status: ReasonPhrases.OK,
			access_token,
		});
	} catch (error) {
		next(error);
	}
};
