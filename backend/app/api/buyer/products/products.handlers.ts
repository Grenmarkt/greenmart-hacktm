import type { Request, Response } from 'express';
import { prismaClient } from '../../../db/prismaClient.ts';
import type { ProductsFilter } from './products.validators.ts';
import { buildProductsQuery } from './products.mappers.ts';

export const getProducts = async (req: Request, res: Response) => {

  const filter: ProductsFilter = req.query;

  const prismaQuery = buildProductsQuery(filter);

  const products = await prismaClient.product.findMany(prismaQuery);
  res.status(200).json(products);
};
