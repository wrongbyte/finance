import morgan from 'morgan';
import Logger from '../config/winston';

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', {
	stream: { write: (message) => Logger.http(message.trim(), { tags: ['http'] }) },
});

export default morganMiddleware;
