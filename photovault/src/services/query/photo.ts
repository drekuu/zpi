import { PhotoFilters } from '@/models/photo';
import { trpc } from '@/trpc/client';

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
