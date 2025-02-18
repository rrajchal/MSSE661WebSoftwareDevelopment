import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'secret_key';
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || 'refresh_secret_key';

const jwtConfig = {
  access: SECRET_KEY,
  refresh: REFRESH_SECRET_KEY,
};

export const generateToken = (userId: string, expiresIn: number) => {
  const payload = { id: userId };
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET_KEY, options);
};

export const generateRefreshToken = (userId: string, expiresIn: number) => {
  const payload = { id: userId };
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, REFRESH_SECRET_KEY, options);
};

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

export const storeRefreshToken = (token: string) => {
  // TODO Implement logic to store the refresh token
  console.log("Storing refresh token:", token);
};

export const deleteRefreshToken = (token: string) => {
  // TODO Implement logic to delete the refresh token 
  console.log("Deleting refresh token:", token);
};

export const findRefreshToken = (token: string) => {
  // TODO Implement logic to find the refresh token
  console.log("Finding refresh token:", token);
  return true;
};

export const token = async (req: Request, res: Response) => {
  if (!req.body || !req.body.token) {
    return res.status(401).json({ error: 'Access Denied. No token provided.' });
  }

  const refreshToken = req.body.token;
  const foundToken = findRefreshToken(refreshToken);

  if (!foundToken) {
    return res.status(401).json({ error: 'Invalid Refresh Token' });
  }

  try {
    const decoded = verifyToken(refreshToken, jwtConfig.refresh);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const accessToken = generateToken((decoded as any).id, 86400); // 86400 seconds = 24 hours

    const newRefreshToken = generateRefreshToken((decoded as any).id, 604800); // 604800 seconds = 7 days
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
    console.error('Token Refresh Error:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
};

export const logout = (req: Request, res: Response) => {
  if (!req.body || !req.body.token) {
    return res.status(400).json({ error: 'No token provided for logout' });
  }

  const token = req.body.token || req.headers.authorization?.split(' ')[1];

  if (token) {
    deleteRefreshToken(token);
  }

  res.json({ message: 'Logout successful' });
};

export const jwtHelper = {
  jwtConfig,
  generateToken,
  generateRefreshToken,
  verifyToken,
  storeRefreshToken,
  deleteRefreshToken,
  findRefreshToken,
  token,
  logout,
};

export default jwtHelper;
