import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

const SECRET_KEY = process.env.JWT_ACCESS_SECRET || 'reallysecretaccesssecret';
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET || 'reallysecretrefreshsecret';

const jwtConfig = {
  access: SECRET_KEY,
  refresh: REFRESH_SECRET_KEY,
};

// Refresh tokens storage (REPLACE with a database or Redis in production)
let refreshTokens: string[] = [];

// Generate Access Token
const generateToken = (id: string, expiresIn: number) => {
  const payload = { id };
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET_KEY, options);
};

// Generate Refresh Token
const generateRefreshToken = (id: string, expiresIn: number) => {
  const payload = { id };
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, REFRESH_SECRET_KEY, options);
};

// Verify Token
const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error('JWT Verification Error:', error);
    throw error;
  }
};

// Store Refresh Token (REPLACE with database or Redis in production)
const storeRefreshToken = (token: string) => {
  refreshTokens.push(token);
};

// Find Refresh Token (REPLACE with database or Redis in production)
const findRefreshToken = (token: string) => {
  return refreshTokens.includes(token);
};

// Delete Refresh Token (REPLACE with database or Redis in production)
const deleteRefreshToken = (token: string) => {
  refreshTokens = refreshTokens.filter(t => t !== token);
};

// Refresh Token Endpoint (/token)
export const token = async (req: Request, res: Response) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Access Denied. No token provided.' });
  }

  if (!findRefreshToken(refreshToken)) {
    return res.status(401).json({ error: 'Invalid Refresh Token' });
  }

  try {
    const decoded: any = verifyToken(refreshToken, REFRESH_SECRET_KEY);

    const accessToken = generateToken(decoded.id, 3600);                 // 1h = 60*60 = 3600
    const newRefreshToken = generateRefreshToken(decoded.id, 86400);      // 1d = 1h * 24 = 3600 * 24 = 86000

    storeRefreshToken(newRefreshToken);
    deleteRefreshToken(refreshToken);

    res.header('access_token', accessToken);
    res.json({
      auth: true,
      msg: 'Access Token Refreshed',
      token_type: 'bearer',
      access_token: accessToken,
      expires_in: 86400,
      refresh_token: newRefreshToken,
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Logout Endpoint (/logout)
export const logout = (req: Request, res: Response) => {
  const token = req.body.token || req.headers.authorization?.split(' ')[1];

  if (token) {
    deleteRefreshToken(token);
  }

  res.json({ message: 'Logout successful' });
};

// Export the functions and constants
export {
  jwtConfig,
  generateToken,
  generateRefreshToken,
  verifyToken,
  storeRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
};
