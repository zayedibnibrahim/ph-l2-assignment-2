import express from 'express';
import { UserController } from './user.controller';

const route = express.Router();

route.post('/', UserController.createUser);
route.get('/', UserController.getAllUsers);
route.get('/:userId', UserController.getSingleUser);
route.put('/:userId', UserController.updateSingleUser);
route.delete('/:userId', UserController.deleteSingleUser);
route.put('/:userId/orders', UserController.addUserOrder);
route.get('/:userId/orders', UserController.getUserOrder);
route.get('/:userId/orders/total-price', UserController.sumOfOrder);

export const UserRoutes = route;
