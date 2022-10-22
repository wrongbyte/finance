import Redis from 'ioredis';
const { REDIS_PORT } = process.env;

export default new Redis({
	port: parseInt(REDIS_PORT),
});
