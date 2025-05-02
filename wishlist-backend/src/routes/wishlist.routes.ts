import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { createWishlist, getAllWishlists } from '../controllers/wishlist.controller';

const router = Router();

// POST /api/wishlists -> Create a new wishlist
//@ts-ignore == > fix these issues later;
router.post('/', authenticate, createWishlist);
//@ts-ignore == > fix these issues later
// GET /api/wishlists -> Get all wishlists of the logged-in user
router.get('/', authenticate, getAllWishlists);

export default router;
