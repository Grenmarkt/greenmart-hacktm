import type { ProductsFilter } from './products.validators.ts';
import type { Prisma } from '@prisma/client';

export function buildProductsQuery(filter: ProductsFilter) {
  const where: Prisma.ProductWhereInput = {
    ...(filter.productType && { productType: { name: filter.productType } }),
    ...(filter.city && { city: filter.city }),
    ...(filter.category && { productType: { category: filter.category } }),
  };

  const orderBy: Prisma.Enumerable<Prisma.ProductOrderByWithRelationInput> = {};
  if (filter.orderBy) {
    orderBy[filter.orderBy] = filter.orderDir || 'asc';
  }

  return { where, orderBy };
}
