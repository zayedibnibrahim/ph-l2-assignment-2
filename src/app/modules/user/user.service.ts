import { TOrders, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('Student already exists');
  }
  const result = await User.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find().select('-password');
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId }).select('-password');
    return result;
  } else {
    throw new Error('User not found');
  }
};

const updateSingleUserFromDB = async (userId: number, userData: TUser) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOneAndUpdate({ userId }, userData, {
      new: true,
      runValidators: true,
    }).select('-password');
    return result;
  } else {
    throw new Error('User not found');
  }
};

const deleteSingleUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.deleteOne({ userId });
    return result;
  } else {
    throw new Error('User not found');
  }
};

const addUserOrderIntoDB = async (userId: number, orderData: TOrders) => {
  const user = await User.findOne({ userId });
  if (!user) {
    throw new Error('User not found');
  } else {
    if (!user.orders) {
      user.orders = [] as Array<TOrders>;
    } else {
      user.orders.push(orderData);
      await user.save();
    }
  }
};

const getUserOrderFromDB = async (userId: number) => {
  const user = await User.findOne({ userId });
  if (!user) {
    throw new Error('User not found');
  } else {
    if (user.orders) {
      return user.orders as Array<TOrders>;
    }
  }
};

const sumOfOrderFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const user = await User.findOne({ userId });
    const sum = user?.orders?.reduce((initialValue, order) => {
      return initialValue + order.price * order.quantity;
    }, 0);

    return sum?.toFixed(2);
  } else {
    throw new Error('User not found');
  }
};
export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
  addUserOrderIntoDB,
  getUserOrderFromDB,
  sumOfOrderFromDB,
};
