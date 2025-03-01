export const GET_ALL_GAMES = 'SELECT * FROM games';
export const GET_GAME_BY_ID = 'SELECT * FROM games WHERE game_id = ?';
export const CREATE_GAME = `
  INSERT INTO games (game_name, category, description, game_rule, image_url, type, created_date, modified_date)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;
export const UPDATE_GAME = `
  UPDATE games SET game_name = ?, category = ?, description = ?, game_rule = ?, image_url = ?, type = ?, modified_date = ?
  WHERE game_id = ?
`;
export const DELETE_GAME = 'DELETE FROM games WHERE game_id = ?';
