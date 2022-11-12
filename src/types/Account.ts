export interface Account {
	accountUUID?: string;
	createdAt?: Date;
	firstName: string;
	lastName: string;
	document: string;
	balance: number;
	password: string;
}
