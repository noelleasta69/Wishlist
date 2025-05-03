import { z } from 'zod';

export const inviteUserSchema = {
  body: z.object({
    email: z.string().email("Invalid email"),
  }),
  params: z.object({
    wishlistId: z.string().min(1, "Wishlist ID is required"),
  }),
};// understand this ??  or change this
