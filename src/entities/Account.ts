import * as bcrypt from 'bcryptjs';
import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	Column,
	Index,
	BeforeInsert,
} from 'typeorm';

@Entity()
export class Account {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 36, nullable: false, unique: true })
	@Index('USER_UUID')
	accountUUID: string;

	@Column({ length: 11, nullable: false, unique: true })
	@Index('USER_DOCUMENT')
	document: string;

	@Column({ type: 'integer' })
	balance: number;

	@Column({ length: 32, nullable: false })
	firstName: string;

	@Column({ length: 32, nullable: false })
	lastName: string;

	@Column({ length: 64, nullable: false })
	password: string;

	@CreateDateColumn()
	createdAt?: string;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 12);
	}

	static async comparePasswords(inputPassword: string, hashedPassword: string) {
		return await bcrypt.compare(inputPassword, hashedPassword);
	}
}
