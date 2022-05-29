import { Request, Response } from 'express';

export const authMiddleware = async (request: Request, response: Response) => {
	return response.status(200).json({ message: 'create account' });
};
