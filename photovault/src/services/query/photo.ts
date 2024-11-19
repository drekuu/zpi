import { useQuery } from '@tanstack/react-query';
import { getPhotos } from '@/app/api/photo';
import { PhotoFilters } from '@/models/photo';

export function usePhotos(filters: PhotoFilters) {
  return useQuery({
    queryKey: ['photos', filters],
    queryFn: () => getPhotos(filters).then((photo) => photo),
  });
}
