import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateToken = (
    user: { id: string },
    secretKey: string,
    expiresIn: number
) => {
    return jwt.sign({ user }, secretKey, { expiresIn });
};

export const verifyToken = (token: string, secretKey: string): JwtPayload => {
  return jwt.verify(token, secretKey) as JwtPayload;
};
