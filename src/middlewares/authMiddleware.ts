import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyJWT } from '../utils/jwt';
import { AppError } from '../error';
import redisClient from '../config/redis';
import { findAccountByUUID } from '../services/accountService';

const invalidTokenMessage = 'Invalid token or expired session';

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
			throw new AppError(invalidTokenMessage, StatusCodes.FORBIDDEN);
		}

		const session = await redisClient.get(decoded.sub);

		if (!session) {
			throw new AppError(invalidTokenMessage, StatusCodes.FORBIDDEN);
		}

		const user = await findAccountByUUID(JSON.parse(session).accountUUID);

		if (!user) {
			throw new AppError(invalidTokenMessage, StatusCodes.FORBIDDEN);
		}

		response.locals.user = user;

		next();
	} catch (error) {
		next(error);
	}
};
