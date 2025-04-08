import User, { IUser } from '../models/User';
import { Types } from 'mongoose';
import { userService } from '../services/userService';

export const userRepo = {

// function that create a new user
  async create(data: Partial<IUser>): Promise<IUser> {
    try {
      const supplier = new User(data);
      return await supplier.save();
    } catch (error: any) {
      console.error('Error in supplierRepo.create:', error.message);
      throw new Error('Failed to create supplier');
    }
  },

// Function that checks if the user exists based on their phone number
async existsByPhone(phoneNumber: string): Promise<boolean> {
    try {
      const supplier = await User.findOne({ phoneNumber });
      return !!supplier;
    } catch (error: any) {
      console.error('Error in supplierRepo.existsByPhone:', error.message);
      throw new Error('Failed to check supplier existence by phone');
    }
  },
// returns user by Id 
  async getById(id: string): Promise<IUser | null> {
    try {
      if (!Types.ObjectId.isValid(id)) return null;
      return await User.findById(id);
    } catch (error: any) {
      console.error('Error in supplierRepo.getById:', error.message);
      throw new Error('Failed to get supplier by ID');
    }
  },

// function that return user by phone number
  async getByPhone(phoneNumber: string): Promise<IUser | null> {
    try {
      return await User.findOne({ phoneNumber });
    } catch (error: any) {
      console.error('Error in supplierRepo.getByPhone:', error.message);
      throw new Error('Failed to get supplier by phone');
    }
  },

// function that return all the users 
  async getAll(): Promise<IUser[]> {
    try {
      return await User.find({}, 'companyName productsOffered');
    } catch (error: any) {
      console.error('Error in supplierRepo.getAll:', error.message);
      throw new Error('Failed to retrieve all suppliers');
    }
  }
};
