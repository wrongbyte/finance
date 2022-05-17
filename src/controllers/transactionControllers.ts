import { Request, Response } from 'express';

export const registerTransaction = async (request: Request, response: Response) => {
	return response.status(200).json({ message: 'create account' });
};

export const getChargeback = async (request: Request, response: Response) => {
	return response.status(200).json({ message: 'authenticate account' });
};

export const getHistory = async (request: Request, response: Response) => {
	return response.status(200).json({ message: 'authenticate account' });
};
