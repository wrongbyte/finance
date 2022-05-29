import { Request, Response } from 'express'
import { errorHandler } from '../error'

export const errorMiddleware = async (error: Error, req: Request, res: Response) => {
    await errorHandler.handleError(error, res);
}