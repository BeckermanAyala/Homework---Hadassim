import Order, { IOrder } from '../models/Order';
import { Types } from 'mongoose';
import { orderService } from '../services/orderService';

export const orderRepo = {
// function that create a new order 
  async create(data: Partial<IOrder>): Promise<IOrder> {
    try {
      const order = new Order(data);
      return await order.save();
    } catch (error: any) {
      console.error('Error in orderRepo.create:', error.message);
      throw new Error('Failed to create order');
    }
  },

// function that return all the orders 
  async getAll(): Promise<IOrder[]> {
    try {
      return await Order.find().populate({
        path: 'supplierId',
        select: 'companyName'
      });
    } catch (error: any) {
      console.error('Error in orderRepo.getAll:', error.message);
      throw new Error('Failed to retrieve orders');
    }
  },
// function that return orders by supplier 
  async getBySupplierId(supplierId: string): Promise<IOrder[]> {
    try {
      if (!Types.ObjectId.isValid(supplierId)) return [];
      return await Order.find({ supplierId });
    } catch (error: any) {
      console.error('Error in orderRepo.getBySupplierId:', error.message);
      throw new Error('Failed to get orders by supplier');
    }
  },
// function that update order status 
  async updateStatus(orderId: string, status: IOrder['status']): Promise<IOrder | null> {
    try {
      if (!Types.ObjectId.isValid(orderId)) return null;
      return await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
    } catch (error: any) {
      console.error('Error in orderRepo.updateStatus:', error.message);
      throw new Error('Failed to update order status');
    }
  },
// function that return order by id 
  async getById(orderId: string): Promise<IOrder | null> {
    try {
      if (!Types.ObjectId.isValid(orderId)) return null;
      return await Order.findById(orderId).populate('supplierId');
    } catch (error: any) {
      console.error('Error in orderRepo.getById:', error.message);
      throw new Error('Failed to get order by ID');
    }
  }

};
