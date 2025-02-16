require('dotenv').config();
const mysql = require('mysql');

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASS || 'root';
const database = process.env.DB_DATABASE || 'demo_db';

const db = mysql.createConnection({
  host,
  user,
  password,
  database,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const CREATE_TASKS_TABLE = `
  CREATE TABLE IF NOT EXISTS tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`;

// Create the tables
db.query(CREATE_USERS_TABLE, (err) => {
  if (err) {
    console.error('Error creating users table:', err);
  } else {
    console.log('Users table created or exists already!');
  }
});

db.query(CREATE_TASKS_TABLE, (err) => {
  if (err) {
    console.error('Error creating tasks table:', err);
  } else {
    console.log('Tasks table created or exists already!');
  }
});

module.exports = db;
