import { queryOptions } from '@tanstack/react-query';
import { $fetch } from '@/lib/http/client';
import { CartItem } from '@/routes/cart';

export function createOrderProductsQuery(userId: string) {
  return queryOptions<CartItem[]>({
    queryKey: ['products', userId] as const,
    queryFn: ({ signal }) =>
      $fetch('@get/api/buyer/orders', {
        params: { userId },
        signal,
      }),
    staleTime: 1000 * 60 * 5,
  });
}
