import app from './server';
import Logger from './config/winston';
import { AppDataSource } from './config/data-source';

const server = app();

AppDataSource.initialize().then(
	server.listen(process.env.PORT, () => {
		Logger.debug('Server running.');
	}),
);
