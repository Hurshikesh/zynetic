import express from 'express';
import { createProduct, getProducts, updateProduct } from '../controllers/product.controller.js';
import { protect } from '../middleware/auth.middleware.js';
const router = express.Router();
router.get('/', getProducts);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
export default router;
