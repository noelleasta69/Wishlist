import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { createWishlist, getAllWishlists, getWishlistMembers, inviteUserToWishlist, leaveWishlist, removeMemberFromWishlist } from '../controllers/wishlist.controller';
import { validate } from '../middlewares/validate';
import { inviteUserSchema } from '../validators/invite.schema';
import { leaveWishlistSchema, removeMemberSchema, wishlistIdParamSchema } from '../validators/wishlist.schema';

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

// Leave wishlist (member leaves themselves)
// @ts-ignore
router.delete('/:wishlistId/leave', leaveWishlist);

// Remove a member (owner removes someone)
// @ts-ignore
router.delete('/:wishlistId/members/:userId', removeMemberFromWishlist);

//@ts-ignore
router.get('/:wishlistId/members', getWishlistMembers);

export default router;
