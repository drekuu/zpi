import { PhotoFilters } from '@/models/photo';
import { trpc } from '@/trpc/client';
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
  return trpc.photo.getPhotos.useQuery(filters);
}

export function usePhoto(id: number) {
  return trpc.photo.getPhoto.useQuery({ id });
}

export function usePhotosByIds(ids: Array<number>) {
  return trpc.photo.getPhotosByIds.useQuery({ ids });
}

export function usePhotosByPhotographer(username: string) {
  return trpc.photo.getPhotosByPhotographer.useQuery({ username });
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
