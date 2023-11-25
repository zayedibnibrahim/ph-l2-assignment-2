import express from 'express';
import { UserController } from './user.controller';

const route = express.Router();

route.post('/', UserController.createUser);
route.get('/', UserController.getAllUsers);
route.get('/:userId', UserController.getSingleUser);

export const UserRoutes = route;
