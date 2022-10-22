import { AppError } from '../error';
import Logger from '../config/winston';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const errorMiddleware = async (error, request, response, next) => {
	let status = StatusCodes.INTERNAL_SERVER_ERROR;
	let message = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
	if (error instanceof AppError) {
		status = error.httpCode;
		message = error.reason;
	}

	if (process.env.NODE_ENV === 'dev') {
		await Logger.error(error);
		console.log(error);
	}

	return response.status(status).json({
		status: status,
		data: message,
	});
};
