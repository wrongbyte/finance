import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Account } from '../entities/Account';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'typeorm',
	synchronize: true,
	logging: false,
	entities: [Account],
	migrations: [],
	subscribers: [],
});
