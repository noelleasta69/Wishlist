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
  

export const updateProduct = async (req: AuthRequest, res: Response) => {
  const { wishlistId, productId } = req.params;
  const { name, price, imageUrl, link } = req.body;
  const userId = req.user!.id;

  const access = await prisma.wishlist.findFirst({
    where: {
      id: wishlistId,
      OR: [
        { ownerId: userId }, 
        { members: { some: { userId } } }
      ],
    },
  });

  if (!access) return res.status(403).json({ message: 'Unauthorized access to wishlist.' });

  const product = await prisma.product.findFirst({
    where: { id: productId, wishlistId },
  });

  if (!product) return res.status(404).json({ message: 'Product not found.' });

  const updated = await prisma.product.update({
    where: { id: productId },
    data: {
      name,
      price,
      imageUrl,
      link,
      editedById: userId,
    },
  });

  res.json(updated);
};


export const deleteProduct = async (req: AuthRequest, res: Response) => {
  const { wishlistId, productId } = req.params;
  const userId = req.user!.id;

  const access = await prisma.wishlist.findFirst({
    where: {
      id: wishlistId,
      OR: [
        { ownerId: userId }, 
        { members: { some: { userId } } }
      ],
    },
  });

  if (!access) return res.status(403).json({ message: 'Unauthorized access to wishlist.' });

  const product = await prisma.product.findFirst({
    where: { id: productId, wishlistId },
  });

  if (!product) return res.status(404).json({ message: 'Product not found.' });

  await prisma.product.delete({ where: { id: productId } });

  res.json({ message: 'Product deleted successfully.' });
};
