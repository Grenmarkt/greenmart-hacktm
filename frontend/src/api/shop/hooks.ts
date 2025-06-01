import { useMutation } from '@tanstack/react-query';
import { $fetch } from '@/lib/http/client';
import { BecomeSellerInput } from '@/lib/http/models/seller';

export function useUpdateShopDescription() {
  return useMutation({
    mutationKey: ['shop', 'update', 'description'] as const,
    mutationFn: (description: string) =>
      $fetch('@patch/api/shop', { body: { description } }),
  });
}

export function useUpdateShopWorkIntervals() {
  return useMutation({
    mutationKey: ['shop', 'update', 'workIntervals'] as const,
    mutationFn: (
      workIntervals: {
        day: string;
        startTime: string;
        endTime: string;
      }[],
    ) => $fetch('@patch/api/shop', { body: { workIntervals } }),
  });
}

export function useBecomeSeller() {
  return useMutation({
    mutationKey: ['shop', 'create'] as const,
    mutationFn: (data: BecomeSellerInput) =>
      $fetch('@post/api/seller/beSeller', { body: data }),
  });
}
