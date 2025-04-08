import express from 'express';
import { orderController } from '../controllers/orderConteoller';

const router = express.Router();

//  create a new order 
router.post('/', orderController.createOrder);

// get all the orders
router.get('/', orderController.getAllOrders);

// get all the orders by supplier id
router.get('/supplier/:supplierId', orderController.getOrdersBySupplierId);

// get order by id 
router.get('/:orderId', orderController.getOrderById);

// update status
router.put('/:orderId/status', orderController.updateOrderStatus);


export default router;
