import { useQuery } from '@tanstack/react-query';
import { getPhotos } from '@/app/api/photo';

export function usePhotos() {
  return useQuery({
    queryKey: ['photos'],
    queryFn: () => getPhotos().then((photo) => photo),
  });
}
