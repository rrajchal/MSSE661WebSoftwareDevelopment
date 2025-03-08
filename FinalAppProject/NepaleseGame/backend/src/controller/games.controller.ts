import { Request, Response } from 'express';
import db from './../db-config';
import * as queries from './../../database/queries/game.queries';

// Get all games
export const getAllGames = (req: Request, res: Response): void => {
  db.query(queries.GET_ALL_GAMES, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(result);
  });
};

// Get game by ID
export const getGameById = (req: Request, res: Response): void => {
  const game_id = parseInt(req.params.game_id);
  db.query(queries.GET_GAME_BY_ID, [game_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(result[0]);
  });
};

// Create a new game
export const createGame = (req: Request, res: Response): void => {
  const { game_name, category, description, game_rule, image_url, type } = req.body;

  if (!game_name || !category || !description || !game_rule || !image_url || !type) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  db.query(queries.INSERT_GAME, [game_name, category, description, game_rule, image_url, type, new Date(), new Date()], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(201).json({ message: 'Game added successfully', gameId: result.insertId });
  });
};

// Update game by ID
export const updateGame = (req: Request, res: Response): void => {
  const game_id = req.params.game_id;
  const { game_name, category, description, game_rule, image_url, type } = req.body;

  if (!game_name || !category || !description || !game_rule || !image_url || !type) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  db.query(queries.UPDATE_GAME_BY_ID, [game_name, category, description, game_rule, image_url, type, game_id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Game not found' });
      return;
    }

    // Fetch the updated game and return it in the response
    db.query(queries.GET_GAME_BY_ID, [game_id], (err, updatedResult) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      res.status(200).json(updatedResult[0]);
    });
  });
};

// Delete a game
export const deleteGame = (req: Request, res: Response): void => {
  const game_id = parseInt(req.params.game_id);
  db.query(queries.DELETE_GAME, [game_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json({ message: 'Game deleted successfully' });
  });
};
