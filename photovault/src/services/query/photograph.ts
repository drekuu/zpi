import { useQuery } from '@tanstack/react-query';
import { getMyself, getPhotographer } from '@/app/api/photograph';

export function useGetMyself() {
  return useQuery({
    queryKey: ['photograph', 'me'],
    queryFn: () => getMyself().then((me) => me),
  });
}

export function useGetPhotographer(name: string) {
  return useQuery({
    queryKey: ['photograph', 'name', name],
    queryFn: () => getPhotographer(name).then((photographer) => photographer),
  });
}
