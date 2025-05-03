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


export const inviteUserToWishlist = async (req: AuthRequest, res: Response) => {
  const { wishlistId } = req.params;
  const { email } = req.body;
  const userId = req.user!.id;
  console.log("first")
  // Check if user is the owner
  const wishlist = await prisma.wishlist.findUnique({
    where: { id: wishlistId },
  });

  if (!wishlist || wishlist.ownerId !== userId) {
    return res.status(403).json({ message: 'Only owners can invite users.' });
  }

  // Find user to invite
  const targetUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!targetUser) {
    return res.status(404).json({ message: 'User not found.' });
  }

  if (targetUser.id === userId) {
    return res.status(400).json({ message: 'You cannot invite yourself.' });
  }

  // Check if already a member
  const existing = await prisma.wishlistUser.findFirst({
    where: {
      wishlistId,
      userId: targetUser.id,
    },
  }); // understand this ?? 

  if (existing) {
    return res.status(400).json({ message: 'User already invited.' });
  }

  // Create invite
  await prisma.wishlistUser.create({
    data: {
      wishlistId,
      userId: targetUser.id,
    },
  });

  res.status(200).json({ message: 'User invited successfully.' });
};


// src/controllers/wishlist.controller
export const leaveWishlist = async (req: Request, res: Response) => {
  const { wishlistId } = req.params;
  //@ts-ignore
  const userId = req.user!.id;

  const wishlist = await prisma.wishlist.findUnique({
    where: { id: wishlistId },
  });

  if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
  if (wishlist.ownerId === userId)
    return res.status(400).json({ message: 'Owner cannot leave the wishlist' });

  await prisma.wishlistUser.delete({
    where: {
      wishlistId_userId: {
        wishlistId,
        userId,
      },
    },
  });

  res.json({ message: 'Left wishlist successfully' });
};

export const removeMemberFromWishlist = async (req: Request, res: Response) => {
  const { wishlistId, userId } = req.params;
  //@ts-ignore
  const ownerId = req.user.id; // understand this ?? why is there a typesript error ?

  const wishlist = await prisma.wishlist.findUnique({
    where: { id: wishlistId },
  });

  if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
  if (wishlist.ownerId !== ownerId)
    return res.status(403).json({ message: 'Only owner can remove members' });

  await prisma.wishlistUser.delete({
    where: {
      wishlistId_userId: {
        wishlistId,
        userId,
      },
    },
  });

  res.json({ message: 'Member removed from wishlist' });
};


// src/controllers/wishlist.controller.ts

export const getWishlistMembers = async (req: Request, res: Response) => {
  const wishlistId = req.params.wishlistId;

  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: { id: wishlistId },
      include: {
        owner: {
          select: { id: true, email: true, username: true },
        },
        members: {
          include: {
            user: {
              select: { id: true, email: true, username: true },
            },
          },
        },
      },
    });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    const members = [
      { ...wishlist.owner, role: 'owner' },
      ...wishlist.members.map((member) => ({
        ...member.user,
        role: 'member',
        invitedAt: member.invitedAt,
      })),
    ]; // understand this pattern ?? 

    return res.status(200).json({ members });
  } catch (error) {
    console.error('Error getting wishlist members:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
