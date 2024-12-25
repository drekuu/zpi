import {
  CartPhotosDetails,
  FullPhoto,
  ManagementTablePhoto,
  PhotoFilters,
} from '@/models/photo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getPhotos,
  getPhoto,
  getPhotosByPhotographer,
  putPhoto,
  getPhotosByPhotographerWithDetails,
  updatePhoto,
  deletePhoto,
  getPhotosByIds,
} from '@/app/api/photo';

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
    queryFn: () =>
      getPhotosByPhotographerWithDetails(username).then((photos) => photos),
  });
}

export function usePutPhoto() {
  return useMutation({
    mutationFn: (props: {
      photoname: string;
      photofile: FormData;
      photo: ManagementTablePhoto;
    }) => {
      return putPhoto(props.photoname, props.photofile, props.photo);
    },
    onSuccess: () => {
      console.log('Success');
    },
    onError: (error) => console.error('Error:', error),
  });
}

export function useUpdatePhoto() {
  return useMutation({
    mutationFn: async (props: { photo: ManagementTablePhoto }) =>
      updatePhoto(props.photo),
    onError: (error) => console.error('Error:', error),
  });
}

export function useDeletePhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => deletePhoto(id),
    onMutate: (id: number) => {
      queryClient.setQueryData(['photos'], (prevPhotos: any) =>
        prevPhotos?.filter((photo: FullPhoto) => photo.id !== id),
      );
    },
  });
}
