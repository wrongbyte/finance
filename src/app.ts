import app from './server';
import Logger from './config/winston';
import { AppDataSource } from './config/data-source';
const { PORT } = process.env

const server : any = app();

AppDataSource.initialize().then(
	server.listen(PORT, () => {
		Logger.debug(`Server running on port ${PORT}`);
	}),
);
