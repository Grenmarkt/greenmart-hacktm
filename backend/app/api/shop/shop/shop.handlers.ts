import { prismaClient } from '../../../db/prismaClient.ts';
import type { Request, Response } from 'express';

export const getShop = async (req: Request, res: Response) => {
  const sellerId = req.params['sellerId'];

  if (!sellerId) {
    res.status(400).json({ error: 'Seller Id is required' });
    return;
  }

  const shop = await prismaClient.shop.findUnique({
    where: { userId: sellerId },
    include: {
      Product: { include: { productType: true } },
      review: true,
      workIntervals: true,
    },
  });

  if (!shop) res.status(404).json({ error: 'Shop not found' });
  res.status(200).json(shop);
};
