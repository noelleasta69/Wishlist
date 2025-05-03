import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { productSchema, updateProductSchema } from '../validators/product.schema';
import { addProductToWishlist, getProductsInWishlist, updateProduct, deleteProduct,} from '../controllers/product.controller';

const router = Router();

//@ts-ignore
router.use(authenticate);

// POST /api/wishlists/:wishlistId/products
//@ts-ignore
router.post('/:wishlistId/products', validate(productSchema), addProductToWishlist);

// GET /api/wishlists/:wishlistId/products
//@ts-ignore
router.get('/:wishlistId/products', getProductsInWishlist);

//@ts-ignore
router.patch('/:wishlistId/products/:productId', validate(updateProductSchema), updateProduct);
//@ts-ignore
router.delete('/:wishlistId/products/:productId', deleteProduct);

export default router;
