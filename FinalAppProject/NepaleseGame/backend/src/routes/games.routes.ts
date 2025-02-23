import express from 'express';
import { getAllGames, getGameById } from '../controller/games.controller';

const gamesRoutes = express.Router();

gamesRoutes.get('/', getAllGames); 
gamesRoutes.get('/:game_id', getGameById);

export { gamesRoutes };
