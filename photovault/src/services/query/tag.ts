import { trpc } from '@/trpc/client';

export function useTags() {
  return trpc.tag.getAllTags.useQuery();
}
