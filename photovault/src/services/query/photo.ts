import { useQuery } from '@tanstack/react-query';
import { getPhotos, getPhoto, getPhotosByPhotographer } from '@/app/api/photo';
import { PhotoFilters } from '@/models/photo';

export function usePhotos(filters: PhotoFilters) {
  return useQuery({
    queryKey: ['photos', filters],
    queryFn: () => getPhotos(filters).then((photos) => photos),
  });
}

export function usePhoto(id: number) {
  return useQuery({
    queryKey: ['photo', id],
    queryFn: () => getPhoto(id).then((photo) => photo),
  });
}

export function useGetPhotosByPhotographer(username: string) {
  return useQuery({
    queryKey: ['photographer', 'photos', username],
    queryFn: () => getPhotosByPhotographer(username).then((photos) => photos),
  });
}
