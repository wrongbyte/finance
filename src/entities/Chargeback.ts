import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Index } from 'typeorm';

@Entity()
export class Chargeback {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 36, nullable: false, unique: true })
	@Index('TRANSACTION_UUID_CHARGEBACK')
	transactionUUID: string;

	@CreateDateColumn()
	createdAt?: string;
}
