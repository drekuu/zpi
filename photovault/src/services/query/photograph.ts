import { useQuery } from '@tanstack/react-query';
import {
  getFeaturedPhotographers,
  getMyself,
  getPhotographer,
} from '@/app/api/photograph';

export function useMyself() {
  return useQuery({
    queryKey: ['photograph', 'me'],
    queryFn: () => getMyself().then((me) => me),
  });
}

export function usePhotographer(name: string) {
  return useQuery({
    queryKey: ['photograph', 'name', name],
    queryFn: () => getPhotographer(name).then((photographer) => photographer),
  });
}

export function useFeaturedPhotographers() {
  return useQuery({
    queryKey: ['featured-photographers'],
    queryFn: () =>
      getFeaturedPhotographers().then((photographers) => photographers),
  });
}
