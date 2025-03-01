import { Request, Response } from 'express';
import db from './../db-config';
import * as queries from './../../database/queries/user.queries';

// Get all users
export const getAllUsers = (req: Request, res: Response) => {
  db.query(queries.GET_ALL_USERS, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(result);
  });
};

// Get user by ID
export const getUserById = (req: Request, res: Response) => {
  const user_id = req.params.userId;
  db.query(queries.GET_USER_BY_ID, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(result[0]);
  });
};

// Get user by username
export const getUserByUsername = (req: Request, res: Response) => {
  const username = req.params.username;
  db.query(queries.GET_USER_BY_USERNAME, [username], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(result[0]);
  });
};
