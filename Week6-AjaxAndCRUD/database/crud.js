const db = require('../server/db-config');

// Create the users table if it doesn't exist
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

// Insert a new user
function insertUser(username, email, password, callback) {
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, password], callback);
}

// Get user by username
function getUserByUsername(username, callback) {
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], callback);
}

// Get all users
function getAllUsers(callback) {
  const query = 'SELECT * FROM users';
  db.query(query, callback);
}

// Update user by ID
function updateUser(id, username, email, password, callback) {
  const query = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
  db.query(query, [username, email, password, id], callback);
}

// Delete user by ID
function deleteUser(id, callback) {
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], callback);
}

module.exports = {
  createUsersTable,
  insertUser,
  getUserByUsername,
  getAllUsers,
  updateUser,
  deleteUser
};
