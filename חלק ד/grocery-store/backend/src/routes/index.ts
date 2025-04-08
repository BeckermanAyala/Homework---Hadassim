import express from 'express';
import supplierRoutes from './supplierRouter';
import orderRoutes from "./orderRoutes";

const router = express.Router();


router.use('/suppliers', supplierRoutes);
router.use('/orders', orderRoutes);


export default router;