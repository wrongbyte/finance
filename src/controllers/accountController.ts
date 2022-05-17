import { Request, Response } from 'express';

export const createAccount = async (request: Request, response: Response) => {
	return response.status(200).json({ message: 'create account' });
};

export const authenticateAccount = async (request: Request, response: Response) => {
	return response.status(200).json({ message: 'authenticate account' });
};

export const balanceAccount = async (request: Request, response: Response) => {
	return response.status(200).json({ message: 'authenticate account' });
};
