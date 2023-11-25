import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrders, TUser } from './user.interface';

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

const userSchema = new Schema<TUser>({
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

export const User = model<TUser>('User', userSchema);
