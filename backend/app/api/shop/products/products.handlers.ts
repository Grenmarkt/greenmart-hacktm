import type { Request, Response } from 'express';
import type { ShopLocals } from '../../../middleware/authHandlers.ts';
import { prismaClient } from '../../../db/prismaClient.ts';
import type {
  CreateProductData,
  ProductsFilter,
} from './products.validators.ts';
import { buildProductsQuery } from './products.mappers.ts';
import { AppError } from '../../../utils/appError.ts';

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
  req: Request,
  res: Response<unknown, ShopLocals>,
) => {
  const data: CreateProductData = req.body;
  const { shop } = res.locals;

  const productType = await prismaClient.productType.findUnique({
    where: { name: data.productType },
  });

  if (!productType) {
    throw AppError.badRequest('Product type not found');
  }

  const product = await prismaClient.product.create({
    data: {
      shopId: shop.id,
      city: shop.city,
      county: shop.county,
      street: shop.street,
      latitude: shop.latitude,
      longitude: shop.longitude,
      title: data.title,
      description: data.description,
      price: data.price,
      unitType: data.unitType,
      stock: data.stock,
      imageId: data.imageId,
      imageUrl: data.imageUrl,
      productTypeId: productType?.id,
    },
  });
  res.status(201).json(product);
};
