import express from 'express';
import { getAllUsers, getUserById } from '../controller/user.controller';
import { verifyToken } from '../controller/auth.controller';

const userRoutes = express.Router();

userRoutes.get('/getAllUsers', getAllUsers);
userRoutes.get('/:userId', verifyToken, getUserById);

export { userRoutes };
