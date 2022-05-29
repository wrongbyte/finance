import app from './server';
import Logger from './config/winston';
import { errorHandler } from './error';
import { AppDataSource } from './config/data-source';

const server = app();

AppDataSource.initialize()
.then(
	server.listen(process.env.PORT, () => {
		Logger.debug('Server running.');
	})
)

process.on("uncaughtException", (error:Error) => {
	// errorHandler.handleError(error);
});

process.on("unhandledRejection", (reason) => {
	// errorHandler.handleError(reason);
  });