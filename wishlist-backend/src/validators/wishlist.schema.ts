// src/validators/wishlist.ts
import { z } from 'zod';

export const leaveWishlistSchema = {
  params: z.object({
    wishlistId: z.string().min(1, "Wishlist ID is required"),
  }),
};

export const removeMemberSchema = {
  params: z.object({
    wishlistId: z.string().min(1, "Wishlist ID is required"),
    userId: z.string().min(1, "User ID is required"),
  }),
};
