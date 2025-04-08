import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const userController = {

// Register a new supplier to the system
async registerSupplier(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const newSupplier = await userService.register(data);
      res.status(201).json(newSupplier);
    } catch (error: any) {
      console.error('Error in registerSupplier:', error.message);
      res.status(400).json({ message: error.message });
    }
  },

// Existing user login
async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { phoneNumber, password } = req.body;
      const { token, role } = await userService.login(phoneNumber, password);
      res.status(200).json({ token, role });      
    } catch (error: any) {
      console.error('Error in loginUser:', error.message);
      res.status(401).json({ message: error.message });
    }
  },
  
  // function that return all the users
  async  getAllSuppliers(req: Request, res: Response) {
    try {
      const suppliers = await userService.getAllSuppliers();
      res.status(200).json(suppliers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  
};
