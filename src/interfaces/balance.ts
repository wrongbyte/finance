import { Account } from './account';

export interface Balance {
	userInfo: Omit<Account, 'id' | 'document' | 'createdAt'>;
	balance: number;
	lastTransaction: Date; // or lastAcessed, idk
}
