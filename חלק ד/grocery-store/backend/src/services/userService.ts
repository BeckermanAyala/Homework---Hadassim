import bcrypt from 'bcrypt';
import { userRepo } from '../repositories/userRepository';
import { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

export const userService = {

// Function that creates a new user and encrypts their password
async register(data: Partial<IUser>): Promise<IUser> {
    const { phoneNumber, password } = data;

    if (!phoneNumber || !password) {
      throw new Error('Phone number and password are required');
    }

    const exists = await userRepo.existsByPhone(phoneNumber);
    if (exists) {
      throw new Error('Supplier with this phone number already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSupplierData = {
      ...data,
      password: hashedPassword,
    };

    const newSupplier = await userRepo.create(newSupplierData);

    return newSupplier;
  },

// Function that logs in an existing user and generates a token for them
async login(phoneNumber: string, password: string): Promise<{ token: string; role: string }> {
    if (!phoneNumber || !password) {
      throw new Error('Phone number and password are required');
    }
  
    const user = await userRepo.getByPhone(phoneNumber);
    if (!user) {
      throw new Error('User not found');
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }
  
    const token = jwt.sign(
      {
        id: user._id,
        companyName: user.companyName,
        role: user.role 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );
  
    return { token, role: user.role }; 
  },
  async  getAllSuppliers() {
    return await userRepo.getAll();
  },
  
};
