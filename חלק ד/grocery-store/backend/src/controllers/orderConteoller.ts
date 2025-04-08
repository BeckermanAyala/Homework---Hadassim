import { Request, Response } from 'express';
import { orderService } from '../services/orderService';

export const orderController = {
// Create a new order
async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const newOrder = await orderService.createOrder(data);
      res.status(201).json(newOrder);
    } catch (error: any) {
      console.error('Error in createOrder:', error.message);
      res.status(400).json({ message: error.message });
    }
  },
 
  // return all the orders
  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error: any) {
      console.error('Error in getAllOrders:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  // return supplier by id
  async getOrdersBySupplierId(req: Request, res: Response): Promise<void> {
    try {
      const supplierId = req.params.supplierId;
      const orders = await orderService.getOrdersBySupplierId(supplierId);
      res.status(200).json(orders);
    } catch (error: any) {
      console.error('Error in getOrdersBySupplierId:', error.message);
      res.status(400).json({ message: error.message });
    }
  },

// update the order status
  async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const updatedOrder = await orderService.updateOrderStatus(orderId, status);
      res.status(200).json(updatedOrder);
    } catch (error: any) {
      console.error('Error in updateOrderStatus:', error.message);
      res.status(400).json({ message: error.message });
    }
  },

// returb order by Id
  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { orderId } = req.params;
      const order = await orderService.getOrderById(orderId);
      if (!order) {
         res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error: any) {
      console.error('Error in getOrderById:', error.message);
      res.status(400).json({ message: error.message });
    }
  }
};
