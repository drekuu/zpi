import { CartPhotosDetails, FullPhoto, PhotoFilters } from '@/models/photo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPhotos, getPhoto, getPhotosByPhotographer, putPhoto, getPhotosByIds, getPhotosByPhotographerWithDetails, updatePhoto } from '@/app/api/photo';
import { StreamingBlobPayloadInputTypes } from '@smithy/types';

export function usePhotos(filters?: PhotoFilters) {
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

export function usePhotosByIds(ids: Array<number>) {
  return useQuery({
    queryKey: ['photos/ids', ids],
    queryFn: () =>
      getPhotosByIds(ids).then((photos) =>
        photos
          ? photos.reduce((result: CartPhotosDetails, photo) => {
              result[photo.id!] = photo;
              return result;
            }, {})
          : null,
      ),
  });
}

export function usePhotosByPhotographer(username: string) {
  return useQuery({
    queryKey: ['photographer', 'photos', username],
    queryFn: () => getPhotosByPhotographer(username).then((photos) => photos),
  });
}

export function useGetPhotosByPhotographerWithDetails(username: string) {
  return useQuery({
    queryKey: ['photographer', 'photos', username, 'details'],
    queryFn: () => getPhotosByPhotographerWithDetails(username).then((photos) => photos),
  });
}

export function usePutPhoto() {
  const { mutate } = useMutation({
    mutationFn: (props: {photoname: string, photofile: StreamingBlobPayloadInputTypes, photo: FullPhoto}) => putPhoto(props.photoname, props.photofile, props.photo),
    onSuccess: (response) => {
      console.log("Success")
    },
    onError: (error) => console.error('Error:', error),
  });
  return { mutate }
}

export function useUpdatePhoto() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (props: {photo: FullPhoto}) => updatePhoto(props.photo),
    onSuccess: (response) => {
      console.log("Success")
    },
    onError: (error) => console.error('Error:', error),
  });
  return { mutate }
}