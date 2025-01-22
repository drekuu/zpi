import { trpc } from '@/trpc/client';

export function useMyself() {
  return trpc.photograph.getMyself.useQuery();
}

export function usePhotographer(name: string) {
  return trpc.photograph.getPhotographer.useQuery({ name });
}

export function useFeaturedPhotographers() {
  return trpc.photograph.getFeaturedPhotographers.useQuery();
}
