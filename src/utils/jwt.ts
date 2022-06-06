import jwt, { SignOptions } from 'jsonwebtoken';
// Authenticate user or refresh token
export const signJWT = (
	payload: Record<string, string>,
	keyname: 'ACCESSTOKEN_PRIVATE_KEY' | 'REFRESHTOKEN_PRIVATE_KEY',
	options: SignOptions,
) => {
	const privateKey = Buffer.from(process.env[keyname], 'base64').toString('utf-8');
	return jwt.sign(payload, privateKey, {
		...(options && options),
		algorithm: 'RS256',
	});
};

// Verify access of refresh token
export const verifyJWT = <T>(token: string, keyName: 'ACCESSTOKEN_PUBLIC_KEY' | 'REFRESHTOKEN_PUBLIC_KEY'): T | null => {
    try {
        const publickKey = Buffer.from(process.env[keyName], 'base64').toString('utf-8');
        const decoded = jwt.verify(token, publickKey) as T
        return decoded
    } catch (error) {
        return null;
    }
}