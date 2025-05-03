import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { createWishlist, getAllWishlists, inviteUserToWishlist } from '../controllers/wishlist.controller';
import { validate } from '../middlewares/validate';
import { inviteUserSchema } from '../validators/invite.schema';

const router = Router();

//@ts-ignore
router.use(authenticate)

// POST /api/wishlists -> Create a new wishlist
//@ts-ignore == > fix these issues later;
router.post('/', createWishlist);
//@ts-ignore == > fix these issues later
// GET /api/wishlists -> Get all wishlists of the logged-in user
router.get('/', getAllWishlists);

console.log("hi"); 
//@ts-ignore == > fix these issues later
router.post('/:wishlistId/invite',validate(inviteUserSchema.body),inviteUserToWishlist);

export default router;
