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

// Update user by ID
export const updateUserById = (req: Request, res: Response): void => {
  const user_id = req.params.userId;
  const { first_name, last_name, username, email } = req.body;

  if (!first_name || !last_name || !username || !email) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  db.query(queries.UPDATE_USER_BY_ID, [first_name, last_name, username, email, user_id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    db.query(queries.GET_USER_BY_ID, [user_id], (err, updatedResult) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      res.status(200).json(updatedResult[0]);
    });
  });
};