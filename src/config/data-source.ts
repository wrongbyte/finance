import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Account } from '../entities/Account';
import { Transaction } from '../entities/Transaction';
const { PSQL_HOST, PSLQ_PORT, PSQL_USER, PSQL_PASSWORD, PSQL_DB } = process.env;

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: PSQL_HOST,
	port: parseInt(PSLQ_PORT),
	username: PSQL_USER,
	password: PSQL_PASSWORD,
	database: PSQL_DB,
	synchronize: true,
	logging: false,
	entities: [Account, Transaction],
	migrations: [],
	subscribers: [],
});
