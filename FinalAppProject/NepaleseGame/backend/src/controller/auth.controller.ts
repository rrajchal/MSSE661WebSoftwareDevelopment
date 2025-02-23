import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken, generateRefreshToken, verifyToken as verifyJWT, storeRefreshToken, jwtConfig } from '../utils/jwt-helpers';
import * as crud from '../../database/user_crud';

const SECRET_KEY = jwtConfig.access;

// Extend the Request interface to include userId
interface ExtendedRequest extends Request {
  userId?: number;
}

export const registerUser = (req: Request, res: Response): Response | undefined => {
  const { first_name, last_name, username, email, password } = req.body;

  if (!first_name || !last_name || !username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      status: 400
    });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err || !hash) {
      return res.status(500).json({
        message: "Internal server error",
        status: 500
      });
    }

    crud.insertUser(first_name, last_name, username, email, hash, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Internal server error",
          status: 500
        });
      }

      res.status(201).json({
        message: "User registered successfully",
        status: 201
      });
    });
  });
};

export const login = (req: Request, res: Response): Response | undefined => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
      status: 400
    });
  }

  crud.getUserByUsername(username, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal server error",
        status: 500
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "Invalid username or password",
        status: 401
      });
    }

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({
          message: "Internal server error",
          status: 500
        });
      }

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid username or password",
          status: 401
        });
      }

      const accessToken = generateToken(user.user_id, 3600); // 1 hour in seconds
      const refreshToken = generateRefreshToken(user.user_id, 86400); // 1 day in seconds

      storeRefreshToken(refreshToken);

      res.status(200).json({
        message: "Login successful",
        status: 200,
        accessToken,
        refreshToken,
        firstName: user.first_name // Include first name in response to display on the page
      });
    });
  });
};

export const verifyToken = (req: ExtendedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(403).json({
      message: "No token provided",
      status: 403
    });
    return;
  }

  const decoded = verifyJWT(token, SECRET_KEY);

  if (!decoded) {
    res.status(401).json({
      message: "Invalid token",
      status: 401
    });
    return;
  }

  // Save decoded info for use in other routes
  req.userId = (decoded as any).id;
  next();
};
