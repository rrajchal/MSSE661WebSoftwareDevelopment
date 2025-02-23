import { Request, Response } from 'express';
import { sampleGames } from '../data';

// Get all games
export const getAllGames = (req: Request, res: Response): void => {
  res.status(200).json(sampleGames);
};

// Get game by ID
export const getGameById = (req: Request, res: Response): void => {
  const game_id = parseInt(req.params.game_id);
  const game = sampleGames.find(game => game.game_id === game_id);

  if (!game) {
    res.status(404).json({ message: 'Game not found' });
    return;
  }

  res.status(200).json(game);
};
