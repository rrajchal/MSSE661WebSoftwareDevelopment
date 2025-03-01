import dotenv from 'dotenv';
import mysql, { MysqlError } from 'mysql';
import path from 'path';

dotenv.config();

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASS || 'root';
const database = process.env.DB_DATABASE || 'nepalese_games';

const con = mysql.createConnection({
  host,
  user,
  password
});

// Connect to MySQL
con.connect((err: MysqlError | null) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');

  // Create the database if it doesn't exist
  con.query(`CREATE DATABASE IF NOT EXISTS ${database}`, (err: MysqlError | null, result: any) => {
    if (err) throw err;
    console.log(`Database ${database} created or already exists`);

    // Use the database
    con.query(`USE ${database}`, (err: MysqlError | null) => {
      if (err) {
        console.error('Error selecting database:', err);
        return;
      }
      console.log(`Database ${database} in use`);

      // Create the users table
      const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
          user_id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          username VARCHAR(255) NOT NULL UNIQUE,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          is_admin BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`;

      con.query(createUsersTable, (err: MysqlError | null, result: any) => {
        if (err) throw err;
        console.log('Users table created or exists already!');

        // Create the games table
        const createGamesTable = `CREATE TABLE IF NOT EXISTS games (
            game_id INT AUTO_INCREMENT PRIMARY KEY,
            game_name VARCHAR(255) NOT NULL,
            category VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            image_url VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`;

        con.query(createGamesTable, (err: MysqlError | null, result: any) => {
          if (err) throw err;
          console.log('Games table created or exists already!');
        });
      });
    });
  });
});

export default con;
