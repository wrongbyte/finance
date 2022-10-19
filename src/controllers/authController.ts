import { CookieOptions } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import redis from '../config/redis';
import { AppError } from '../error';
import { findAccountByDocument } from '../services/accountService';
import { signJWT, verifyJWT } from '../utils/jwt';
const cookieOptions : CookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production' ? true : false
}

export const accessTokenCookieOptions: CookieOptions = {
    ...cookieOptions,
    expires: new Date(
        Date.now() + parseInt(process.env.ACCESS_TOKEN_TIMEOUT) * 60 * 1000
    ),
    maxAge: parseInt(process.env.ACCESS_TOKEN_TIMEOUT) * 60 * 1000,
};

export const refreshTokenCookieOptions: CookieOptions = {
    ...cookieOptions,
    expires: new Date (
        Date.now() + parseInt(process.env.REFRESH_TOKEN_TIMEOUT) * 60 * 1000
    ),
    maxAge: parseInt(process.env.REFRESH_TOKEN_TIMEOUT) * 60 * 1000,
}

export const refreshTokenController = async (request, response, next) => {
    try {
        const errorMessage = 'Invalid refresh token';

        const refresh_token = request.cookies.refresh_token;
        
        if (!refresh_token) {
            throw new AppError(errorMessage, StatusCodes.FORBIDDEN);
        }

        const decoded = verifyJWT<{ sub: string }>(refresh_token, 'REFRESHTOKEN_PUBLIC_KEY')

        if (!decoded) {
            throw new AppError(errorMessage, StatusCodes.FORBIDDEN);
        }

        const accountSession = await redis.get(decoded.sub);

        if (!accountSession) {
            throw new AppError(errorMessage, StatusCodes.FORBIDDEN); 
        }

        const account = await findAccountByDocument(JSON.parse(accountSession).accountUUID);

        if (!account) {
            throw new AppError(errorMessage, StatusCodes.FORBIDDEN); 
        }

        const access_token = signJWT({ sub: account.accountUUID }, 'ACCESSTOKEN_PRIVATE_KEY', {
            expiresIn: `${parseInt(process.env.ACCESS_TOKEN_TIMEOUT)}m`,
        });

        response.cookie('access_token', access_token, accessTokenCookieOptions);
        response.cookie('logged_in', true, {
            ...accessTokenCookieOptions,
            httpOnly: false,
        })

		response.send({
			status: ReasonPhrases.OK,
			access_token,
		});
    } catch (error) {
        next(error)
    }
}