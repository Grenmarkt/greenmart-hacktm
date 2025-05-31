import type { ProductsFilter } from './products.validators.ts';
import type { Prisma } from '@prisma/client';

export function buildProductsQuery(filter: ProductsFilter) {
  const where: Prisma.ProductWhereInput = {
    ...(filter.name && { productType: { name: filter.name } }),
  };

  const orderBy: Prisma.Enumerable<Prisma.ProductOrderByWithRelationInput> = {};
  if (filter.orderBy) {
    orderBy[filter.orderBy] = filter.orderDir || 'asc';
  }

  return { where, orderBy };
}
