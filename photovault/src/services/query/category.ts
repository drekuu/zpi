import { trpc } from '@/trpc/client';

export function useCategories() {
  return trpc.category.getAllCategories.useQuery();
}
