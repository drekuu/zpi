import { useQuery } from '@tanstack/react-query';
import {
  getMyself,
  getPhotographer,
  getPhotographers,
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

export function usePhotographers() {
  return useQuery({
    queryKey: ['photographers'],
    queryFn: () => getPhotographers().then((photographers) => photographers),
  });
}
