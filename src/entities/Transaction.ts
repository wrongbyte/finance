import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	Column,
	Index,
	BeforeInsert,
} from 'typeorm';

@Entity()
export class Transaction {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 36, nullable: false })
	sourceAccountUUID: string;

	@Column({ length: 36, nullable: false })
	destinationAccountUUID: string;

	@Index(['sourceAccountUUID', 'destinationAccountUUID'])
	@Column({ type: 'decimal', precision: 6, scale: 2, nullable: false })
	quantity: number;

	@CreateDateColumn()
	createdAt?: string;
}
