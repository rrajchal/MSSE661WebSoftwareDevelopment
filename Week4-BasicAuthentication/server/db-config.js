require('dotenv').config();
const mysql = require('mysql');
const path = require('path');

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASS || 'root';
const database = process.env.DB_DATABASE || 'demo_db';

const con = mysql.createConnection({
  host,
  user,
  password,
  database
});

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL!');

  // Execute the query to create the users table
  con.query(createUsersTable, function(err, result) {
    if (err) throw err;
    console.log('Users table created or exists already!');
  });
});

module.exports = con;
