import { Request, Response } from 'express';
import Decimal from 'decimal.js';
import { createAccount } from '../services/account.service';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';

const accountSchema = yup
	.object()
	.shape({
		document: yup
			.string()
			.matches(/^[0-9]{11}$/)
			.required(),
		firstName: yup.string().required().min(2).max(32),
		lastName: yup.string().required().min(2).max(32),
		balance: yup.string().required(), //TODO: check initial balance
		password: yup.string().required().min(8).max(32),
	})
	.noUnknown()
	.required();

export const registerAccount = async (payload: unknown): Promise<Response | void> => {
	const accountPayload = await accountSchema.validate(payload);
	try {
		await createAccount({
			...accountPayload,
			accountUUID: uuid()
		})
	} catch(error) {
		console.log(error);
	}
	
};

export const authenticateAccount = async (request: Request, response: Response) => {
	return response.status(200).json({ message: 'authenticate account' });
};

export const balanceAccount = async (request: Request, response: Response) => {
	return response.status(200).json({ message: 'authenticate account' });
};
