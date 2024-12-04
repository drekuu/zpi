import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPhotos, getPhoto, getPhotosByPhotographer, putPhoto } from '@/app/api/photo';
import { PhotoFilters } from '@/models/photo';
import { StreamingBlobPayloadInputTypes } from '@smithy/types';

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

export function usePutPhoto() {
  const { mutate } = useMutation({
    mutationFn: (a: {photoId: string, photo: StreamingBlobPayloadInputTypes}) => putPhoto(a.photoId, a.photo),
    onSuccess: (response) => {
      console.log("Success")
    },
    onError: (error) => console.error('Error:', error),
  });
  return { mutate }
}