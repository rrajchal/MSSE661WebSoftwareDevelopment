export const GET_ALL_USERS = 'SELECT * FROM users';
export const GET_USER_BY_ID = 'SELECT * FROM users WHERE user_id = ?';
export const GET_USER_BY_USERNAME = `SELECT * FROM users WHERE username = ?`;
export const UPDATE_USER_BY_ID = 'UPDATE users SET first_name = ?, last_name = ?, username = ?, email = ? WHERE user_id = ?';
