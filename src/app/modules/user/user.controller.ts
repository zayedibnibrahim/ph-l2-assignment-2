/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import userValidationSchema from './user.validation';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodValidateData = userValidationSchema.parse(user);
    const result = await UserService.createUser(zodValidateData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUser();
    res.status(200).json({
      success: true,
      message: 'Student received successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line no-undef
    const userId: ParamsDictionary = req.params;
    const result = await UserService.getSingleUser(userId);
    res.status(200).json({
      success: true,
      message: 'Single student received successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
};
