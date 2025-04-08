import express from 'express';
import { userController } from '../controllers/userController';
const router = express.Router();


// create new order 
router.post('/register', userController.registerSupplier);

// User login to the system
router.post('/login', userController.loginUser);

// get all the users 
router.get('/', userController.getAllSuppliers);


export default router;
