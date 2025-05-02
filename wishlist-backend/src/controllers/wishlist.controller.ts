import { Request, Response } from 'express';
import { prisma } from '../app';
import { AuthRequest } from '../middlewares/auth';

export const createWishlist = async (req: AuthRequest, res: Response) => {
  const { name } = req.body;
  const userId = req.user!.id;

  const wishlist = await prisma.wishlist.create({
    data: {
      name,
      ownerId: userId,
    },
  });

  res.status(201).json(wishlist);
};

export const getAllWishlists = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const wishlists = await prisma.wishlist.findMany({
    where: {
      ownerId: userId,
    },
  });

  res.json(wishlists);
};
