import express from 'express';
import { getAllGames, getGameById, createGame, updateGame, deleteGame } from '../controller/games.controller';

const gamesRoutes = express.Router();

gamesRoutes.get('/', getAllGames); 
gamesRoutes.get('/:game_id', getGameById);
gamesRoutes.post('/', createGame);
gamesRoutes.put('/:game_id', updateGame);
gamesRoutes.delete('/:game_id', deleteGame);

export { gamesRoutes };
