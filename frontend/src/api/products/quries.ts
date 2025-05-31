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
