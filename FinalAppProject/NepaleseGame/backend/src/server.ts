import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
const logger = require('morgan');
const bodyParser = require('body-parser');
const logLevel = process.env.LOG_LEVEL || 'dev';
const con = require('./db-config');
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { gamesRoutes } from './routes/games.routes';
const middleware = require('./middleware/errors.middleware');

dotenv.config();

const app = express();

app.use(express.json());

// Middleware - logs server requests to console
app.use(logger(logLevel));

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use auth routes
app.use('/api/auth', authRoutes);          // http://localhost:5000/api/auth
app.use('/api/auth/login', authRoutes);    // http://localhost:5000/api/auth/login
app.use('/api/auth/logout', authRoutes);    // http://localhost:5000/api/auth/logout
app.use('/api/user', userRoutes);    // http://localhost:5000/api/user
app.use('/api/games', gamesRoutes);  // http://localhost:5000/api/games

// Handle 404 requests
app.use(middleware.error404);

// Handle 500 requests - applies mostly to live services
app.use(middleware.error500);

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});
