import { Account } from './Account';

export interface Balance {
	userInfo: Omit<Account, 'id' | 'document' | 'createdAt'>;
	balance: number;
	lastTransaction: Date;
}
