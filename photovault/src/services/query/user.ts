import { trpc } from '@/trpc/client';

export function useMyself() {
  return trpc.user.getMyself.useQuery();
}
