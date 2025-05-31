import type { Request, Response } from 'express';
import type { GetProductData } from './products.validators.ts';
import { logger } from '../../../utils/logger.ts';
import { prismaClient } from '../../../db/prismaClient.ts';
import { AppError } from '../../../utils/appError.ts';

export const getProduct = async (req: Request, res: Response) => {
  const params = req.params as GetProductData;

  logger.debug(params);

  const product = await prismaClient.product.findUnique({
    where: {
      id: params.productId,
    },
  });

  if (!product) {
    throw AppError.notFound(
      `Product with id ${params.productId} was not found`,
    );
  }

  res.status(200).json(product);
};
