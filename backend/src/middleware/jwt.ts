import jwt, { type SignOptions } from 'jsonwebtoken';

export const generateToken = (username: string, id: string) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN ?? '1d') as SignOptions["expiresIn"]
    }

    return jwt.sign({username, id}, secret, options)
}

/**
 *
 * @param token
 * @return string --> IDK
 * @return jwt.JwtPayload --> decoded payload
 */
export const verifyToken = (token: string): jwt.JwtPayload => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.verify(token, secret) as jwt.JwtPayload;
}