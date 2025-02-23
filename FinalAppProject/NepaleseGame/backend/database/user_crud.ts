import db from '../src/db-config';

// Insert user
export function insertUser(first_name: string, last_name: string, username: string, email: string, password: string, callback: (err: any, result: any) => void) {
  const query = 'INSERT INTO users (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [first_name, last_name, username, email, password], callback);
}

// Get user by username
export function getUserByUsername(username: string, callback: (err: any, result: any) => void) {
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], callback);
}

// Get user by ID
export function getUserById(user_id: number, callback: (err: any, result: any) => void) {
  const query = 'SELECT * FROM users WHERE user_id = ?';
  db.query(query, [user_id], callback);
}

// Get all users
export function getAllUsers(callback: (err: any, result: any) => void) {
  const query = 'SELECT * FROM users';
  db.query(query, callback);
}

// Update user by ID
export function updateUser(user_id: number, first_name: string, last_name: string, username: string, email: string, password: string, callback: (err: any, result: any) => void) {
  const query = 'UPDATE users SET first_name = ?, last_name = ?, username = ?, email = ?, password = ? WHERE user_id = ?';
  db.query(query, [first_name, last_name, username, email, password, user_id], callback);
}

// Delete user by ID
export function deleteUser(user_id: number, callback: (err: any, result: any) => void) {
  const query = 'DELETE FROM users WHERE user_id = ?';
  db.query(query, [user_id], callback);
}
