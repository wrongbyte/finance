import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyJWT } from '../utils/jwt';
import { AppError } from '../error';

export const authMiddleware = async (request: Request, response: Response, next) => {
	try {
		let access_token = null;
		if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
			access_token = request.headers.authorization.split(' ')[1];
		} else if (request.cookies.access_token) {
			access_token = request.cookies.access_token;
		}

		if (!access_token) {
			throw new AppError('User not logged in', StatusCodes.FORBIDDEN);
		}

		const decoded = verifyJWT<{ sub: string }>(access_token, 'ACCESSTOKEN_PUBLIC_KEY');

		if (!decoded) {
			throw new AppError('Invalid token', StatusCodes.FORBIDDEN);
		}

		next();
	} catch (error) {
		next(error);
	}
};
