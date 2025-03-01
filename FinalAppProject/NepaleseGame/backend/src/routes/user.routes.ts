import express from 'express';
import { getAllUsers, getUserById, getUserByUsername } from '../controller/user.controller';
import { verifyToken } from '../controller/auth.controller';

const userRoutes = express.Router();

userRoutes.get('/getAllUsers', getAllUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.get('/username/:username', getUserByUsername);

export { userRoutes };
