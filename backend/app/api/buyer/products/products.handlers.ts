import type { Request, Response } from 'express';
import type { GetProductData } from './products.validators.ts';
import { logger } from '../../../utils/logger.ts';
import { prismaClient } from '../../../db/prismaClient.ts';
import { AppError } from '../../../utils/appError.ts';
import type { ProductsFilter } from './products.validators.ts';
import { buildProductsQuery } from './products.mappers.ts';

export const getProduct = async (req: Request, res: Response) => {
  const params = req.params as GetProductData;

  logger.debug(params);

  const product = await prismaClient.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      productType: true,
      shop: true,
    },
  });

  if (!product) {
    throw AppError.notFound(
      `Product with id ${params.productId} was not found`,
    );
  }

  res.status(200).json(product);
};

export const getProducts = async (req: Request, res: Response) => {
  const filter: ProductsFilter = req.query;

  const prismaQuery = buildProductsQuery(filter);

  const products = await prismaClient.product.findMany({
    ...prismaQuery,
    include: { productType: true, shop: true },
  });
  res.status(200).json(products);
};
