import app from './server';
import Logger from './config/winston';

const server = app();
server.listen(process.env.PORT, () => {
	Logger.debug('Server running.');
});
