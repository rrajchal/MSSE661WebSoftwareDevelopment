import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { sampleGames } from "./data";
const logger = require('morgan');
const bodyParser = require('body-parser');
const logLevel = process.env.LOG_LEVEL || 'dev';
const con = require('./db-config');
import authRoutes from './routes/auth.routes'; // Import auth routes

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

app.use('/auth', authRoutes); // Use auth routes

app.get("/", (req, res) => {
    console.log("Backend: GET /");
    res.send(sampleGames);
});

app.get("/api/games", (req, res) => {
    res.send(sampleGames);
})

// Handle 404 requests
app.use(middleware.error404);

// Handle 500 requests - applies mostly to live services
app.use(middleware.error500);

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});
