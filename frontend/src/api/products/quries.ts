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

export function createProductsQuery(productType: string) {
  return queryOptions({
    queryKey: ['products', productType] as const,
    queryFn: async ({ signal }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fetchOptions: any = { query: {}, signal };

      if (productType !== 'Toate') {
        fetchOptions.query = { productType };
      }

      const data = await $fetch('@get/api/buyer/products', fetchOptions);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
