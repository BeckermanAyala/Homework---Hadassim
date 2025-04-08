import { orderRepo } from '../repositories/orderRepository';
import { IOrder } from '../models/Order';

export const orderService = {
  // create a new order
  async createOrder(data: Partial<IOrder>): Promise<IOrder> {
    if (!data.supplierId || !data.products || data.products.length === 0) {
      throw new Error('Supplier and products are required to create an order');
    }

    return await orderRepo.create(data);
  },

// get all the orders 
 async getAllOrders(): Promise<IOrder[]> {
    return await orderRepo.getAll();
  },

// get the orders by supplier
  async getOrdersBySupplierId(supplierId: string): Promise<IOrder[]> {
    if (!supplierId) {
      throw new Error('Supplier ID is required');
    }

    return await orderRepo.getBySupplierId(supplierId);
  },

// updates order status 
  async updateOrderStatus(orderId: string, status: IOrder['status']): Promise<IOrder | null> {
    if (!orderId || !status) {
      throw new Error('Order ID and status are required');
    }

    const updatedOrder = await orderRepo.updateStatus(orderId, status);
    if (!updatedOrder) {
      throw new Error('Order not found or failed to update');
    }

    return updatedOrder;
  },
// get order by id 
  async getOrderById(orderId: string): Promise<IOrder | null> {
    if (!orderId) {
      throw new Error('Order ID is required');
    }

    return await orderRepo.getById(orderId);
  },
  
};
