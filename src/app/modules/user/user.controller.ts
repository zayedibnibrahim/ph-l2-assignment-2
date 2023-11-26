/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { UserService } from './user.service';
import { orderValidationSchema, userValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodValidateData = userValidationSchema.parse(user);
    const result = await UserService.createUserIntoDB(zodValidateData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: res.statusCode,
        description: err.message || 'Something went wrong',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: res.statusCode,
        description: err.message || 'Something went wrong',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getSingleUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: res.statusCode,
        description: err.message || 'Something went wrong',
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { userId } = req.params;

    const result = await UserService.updateSingleUserFromDB(
      Number(userId),
      userData
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: res.statusCode,
        description: err.message || 'Something went wrong',
      },
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserService.deleteSingleUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: res.statusCode,
        description: err.message || 'Something went wrong',
      },
    });
  }
};

const addUserOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const { userId } = req.params;

    const zodValidateData = orderValidationSchema.parse(orderData);
    await UserService.addUserOrderIntoDB(Number(userId), zodValidateData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: res.statusCode,
        description: err.message || 'Something went wrong',
      },
    });
  }
};

const getUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.getUserOrderFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: { orders: result },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: res.statusCode,
        description: err.message || 'Something went wrong',
      },
    });
  }
};

const sumOfOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.sumOfOrderFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice: result },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: res.statusCode,
        description: err.message || 'Something went wrong',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addUserOrder,
  getUserOrder,
  sumOfOrder,
};
