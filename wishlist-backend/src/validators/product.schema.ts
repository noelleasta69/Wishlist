import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().optional(),
  link: z.string().url({ message: 'Must be a valid URL' }),
  imageUrl: z.string().url().optional(),
  price: z.number().nonnegative().optional(),
});


export const updateProductSchema = productSchema.partial().extend({
  link: z.string().url().optional(), // make link optional in update
});