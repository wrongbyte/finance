import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Index } from 'typeorm';

@Entity()
export class Transaction {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 36, nullable: false })
	sourceAccountUUID: string;

	@Column({ length: 36, nullable: false })
	destinationAccountUUID: string;

	@Index(['sourceAccountUUID', 'destinationAccountUUID'])
	@Column({ type: 'integer' })
	quantity: number;

	@CreateDateColumn()
	createdAt?: string;
}
