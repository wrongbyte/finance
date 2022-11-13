export interface TransactionPayload {
	sourceAccountUUID: string;
	destinationAccountUUID: string;
	amount: number | string;
}
