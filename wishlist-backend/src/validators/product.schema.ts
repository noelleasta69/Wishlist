import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().optional(),
  link: z.string().url({ message: 'Must be a valid URL' }),
  imageUrl: z.string().url().optional(),
  price: z.number().nonnegative().optional(),
});


