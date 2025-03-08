export const GET_ALL_GAMES = 'SELECT * FROM games';
export const GET_GAME_BY_ID = 'SELECT * FROM games WHERE game_id = ?';
export const INSERT_GAME = 'INSERT INTO games (game_name, category, description, game_rule, image_url, type, created_date, modified_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
export const UPDATE_GAME_BY_ID = 'UPDATE games SET game_name = ?, category = ?, description = ?, game_rule = ?, image_url = ?, type = ? WHERE game_id = ?';
export const DELETE_GAME = 'DELETE FROM games WHERE game_id = ?';

