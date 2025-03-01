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
  const { game_name, category, description, game_rule, image_url, type, created_date, modified_date } = req.body;
  const values = [game_name, category, description, game_rule, image_url, type, created_date, modified_date];
  db.query(queries.CREATE_GAME, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: 'Game created successfully', game_id: result.insertId });
  });
};

// Update a game
export const updateGame = (req: Request, res: Response): void => {
  const game_id = parseInt(req.params.game_id);
  const { game_name, category, description, game_rule, image_url, type, modified_date } = req.body;
  const values = [game_name, category, description, game_rule, image_url, type, modified_date, game_id];
  db.query(queries.UPDATE_GAME, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json({ message: 'Game updated successfully' });
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
