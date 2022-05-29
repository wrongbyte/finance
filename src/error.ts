// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/useonlythebuiltinerror.md
export class AppError extends Error {
	public readonly reason: string;
	public readonly httpCode: number;

	constructor(reason: string, httpCode: number = 500, description: string = '') {
		super(description);

		Object.setPrototypeOf(this, new.target.prototype); // restores prototype chain

		this.reason = reason;
		this.httpCode = httpCode;

		Error.captureStackTrace(this);
	}
}
