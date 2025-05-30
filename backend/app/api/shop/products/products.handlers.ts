import type { Request, Response } from 'express';
import type { ShopLocals } from '../../../middleware/authHandlers.ts';
import { prismaClient } from '../../../db/prismaClient.ts';
import type { ProductsFilter } from './products.validators.ts';
import { createProductSchema } from './products.validators.ts';
import { buildProductsQuery } from './products.mappers.ts';

export const getProducts = async (
  req: Request,
  res: Response<unknown, ShopLocals>,
) => {
  const { shop } = res.locals;
  const filter: ProductsFilter = req.query;

  const prismaQuery = buildProductsQuery(filter, shop);

  const products = await prismaClient.product.findMany(prismaQuery);
  res.status(200).json(products);
};

export const createProduct = async (
  _req: Request,
  _res: Response<unknown, ShopLocals>,
) => {
  const validData = createProductSchema.parse(_req.body);

  const { shop } = _res.locals;
  const product = await prismaClient.product.create({
    data: {
      ...validData,
     shop: {
        connect: {
          id: shop.id,
        },
      },
    productType:{
      connect: {
        id: validData.productType,
      },
    }
  }
});
  _res.status(201).json(product);
}
