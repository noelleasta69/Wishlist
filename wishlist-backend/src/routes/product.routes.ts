import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { productSchema } from '../validators/product.schema';
import { addProductToWishlist, getProductsInWishlist } from '../controllers/product.controller';

const router = Router();

// Apply JWT auth to all routes
//@ts-ignore
router.use(authenticate);

// POST /api/wishlists/:wishlistId/products
//@ts-ignore
router.post('/:wishlistId/products', validate(productSchema), addProductToWishlist);

// GET /api/wishlists/:wishlistId/products
//@ts-ignore
router.get('/:wishlistId/products', getProductsInWishlist);

export default router;
