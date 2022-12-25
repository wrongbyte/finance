import { AppError } from '../error';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ValidationError } from 'yup';

export const errorMiddleware = async (error, request, response, next) => {
	let status = StatusCodes.INTERNAL_SERVER_ERROR;
	let message = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
	if (error instanceof AppError) {
		status = error.httpCode;
		message = error.reason;
	}

	if (error instanceof ValidationError) {
		status = StatusCodes.BAD_REQUEST;
	}

	if (process.env.NODE_ENV === 'dev' && !(error instanceof AppError)) {
		console.log(error);
	}

	return response.status(status).json({
		status: status,
		data: message,
	});
};
