import { Account } from './Account';

// TODO: use Readonly<T> when dealing with this type
export interface Transaction {
	id: string; //uuid
	sender: Account; // make it better pls
	receiver: Account;
	processedAt: Date;
}
