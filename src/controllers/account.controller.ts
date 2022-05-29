import { Request, Response } from 'express';
import { AppError } from '../error';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { createAccount, findAccountByDocument } from '../services/account.service';
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
	const existingAccount = await findAccountByDocument({ document: accountPayload.document });
	if (existingAccount) {
		throw new AppError("There's already an user with this document", StatusCodes.BAD_REQUEST);
	}
	await createAccount({
		...accountPayload,
		accountUUID: uuid(),
	});
};

export const authenticateAccount = async (request, response) => {
	return response.status(200).json({ message: 'authenticate account' });
};

export const balanceAccount = async (request, response) => {
	return response.status(200).json({ message: 'authenticate account' });
};
