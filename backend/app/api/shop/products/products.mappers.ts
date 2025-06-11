import type { ProductsFilter } from './products.validators.ts';
import type { Prisma, Shop } from '@prisma/client';

export function buildProductsQuery(filter: ProductsFilter, shop: Shop) {
  const where: Prisma.ProductWhereInput = {
    ...(filter.category && { productType: { category: filter.category } }),
    ...{ shopId: shop.id },
  };

  const orderBy: Prisma.Enumerable<Prisma.ProductOrderByWithRelationInput> = {};
  if (filter.orderBy) {
    orderBy[filter.orderBy] = filter.orderDir || 'asc';
  }

  return { where, orderBy };
}
