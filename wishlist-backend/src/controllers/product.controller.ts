import { Response } from 'express';
import { prisma } from '../app';
import { AuthRequest } from '../middlewares/auth';

export const addProductToWishlist = async (req: AuthRequest, res: Response) => {
  const { wishlistId } = req.params;
  const { name, link, imageUrl, price } = req.body;
  const userId = req.user!.id;


  const access = await prisma.wishlist.findFirst({
    where: {
      id: wishlistId,
      OR: [
        { ownerId: userId },
        { members: { some: { userId } } },
      ],
    },
  });

  if (!access) {
    return res.status(403).json({ message: 'Unauthorized access to wishlist.' });
  }

  const product = await prisma.product.create({
    data: {
      name,
      link,
      imageUrl,
      price,
      wishlistId,
      addedById: userId,
    },
  });

  res.status(201).json(product);
};

export const getProductsInWishlist = async (req: AuthRequest, res: Response) => {
    const { wishlistId } = req.params;
    const userId = req.user!.id;
  
    const access = await prisma.wishlist.findFirst({
      where: {
        id: wishlistId,
        OR: [
          { ownerId: userId },
          { members: { some: { userId } } },
        ],
      },
      include: {
        products: true,
      },
    });
  
    if (!access) {
      return res.status(403).json({ message: 'Unauthorized access to wishlist.' });
    }
  
    res.json(access.products);
  };
  