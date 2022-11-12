import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';
import { AppError } from '../error';

export const registerTransaction = async (request: Request, response: Response) => {
	return response.status(200).json({ message: 'register transaction' });
};

export const getChargeback = async (request: Request, response: Response) => {
	return response.status(200).json({ message: 'get chargeback' });
};

export const getHistory = async (request: Request, response: Response) => {
	return response.status(200).json({ message: 'get history' });
};
