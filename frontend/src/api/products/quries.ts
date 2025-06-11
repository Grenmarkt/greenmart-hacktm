import { queryOptions } from '@tanstack/react-query';
import { $fetch } from '@/lib/http/client';

export function createProductQuery(productId: string) {
  return queryOptions({
    queryKey: ['products', productId] as const,
    queryFn: ({ signal }) =>
      $fetch('@get/api/buyer/products/:productId', {
        params: { productId },
        signal,
      }),
    staleTime: 1000 * 60 * 5,
  });
}

export function createProductsQuery(
  productType: string,
  city: string,
  category: string,
) {
  return queryOptions({
    queryKey: ['products', productType, city, category] as const,
    queryFn: async ({ signal }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fetchOptions: any = { query: {}, signal };

      if (productType !== 'Toate') {
        fetchOptions.query.productType = productType;
      }
      if (city !== 'Toate') {
        fetchOptions.query.city = city;
      }

      if (category !== 'Toate') {
        fetchOptions.query.category = category;
      }

      const data = await $fetch('@get/api/buyer/products', fetchOptions);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
