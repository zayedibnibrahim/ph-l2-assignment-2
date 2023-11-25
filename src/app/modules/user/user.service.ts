import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

const updateSingleUser = async (userId: number, userData: TUser) => {
  const result = await User.updateOne({ userId }, userData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSingleUser = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  return result;
};

export const UserService = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
