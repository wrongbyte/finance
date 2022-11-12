export interface Transaction {
	id: string;
	readonly sourceAccountUUID: string;
	readonly destinationAccountUUID: string;
	readonly createdAt: Date;
}
