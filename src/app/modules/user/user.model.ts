import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  UserExistsModel,
} from './user.interface';
import config from '../../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is  required'],
    maxlength: [20, 'First name cant be more than 20 characters'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is  required'],
    maxlength: [20, 'Last name cant be more than 20 characters'],
    trim: true,
  },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<TOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, UserExistsModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true, default: true },
  hobbies: { type: [String] },
  address: { type: addressSchema, required: true },
  orders: { type: [orderSchema] },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserExistsModel>('User', userSchema);
