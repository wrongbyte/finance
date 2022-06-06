import Decimal from 'decimal.js';

export interface Account {
	accountUUID?: string;
	createdAt?: Date;
	firstName: string;
	lastName: string;
	document: string;
	balance: Decimal;
	password: string;
}

export interface LoginAccount {
	document: string;
	password: string;
}

export type PublicAccount = Omit<Account, 'password' | 'createdAt'>;
