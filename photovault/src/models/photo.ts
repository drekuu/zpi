import { Unpacked } from '@/utils/typescript';
import {
  getPhoto,
  getPhotos,
  getPhotosByIds,
  getPhotosByPhotographerWithDetails,
} from '@/app/api/photo';
import type { inferRouterOutputs, inferRouterInputs } from '@trpc/server';
import type { AppRouter } from '@/server';

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type PhotoFilters = RouterInput['photo']['getPhotos'];
export type GalleryPhoto = NonNullable<
  Unpacked<Awaited<RouterOutput['photo']['getPhoto']>>
>;
export type FullPhoto = NonNullable<Awaited<RouterOutput['photo']['getPhoto']>>;
export type FullPhoto = NonNullable<Awaited<ReturnType<typeof getPhoto>>>;
export type CartPhotoDetails = NonNullable<
  Unpacked<Awaited<ReturnType<typeof getPhotosByIds>>>
>;
export type ManagementTablePhoto = Unpacked<
  Awaited<ReturnType<typeof getPhotosByPhotographerWithDetails>>
>;

export type CartPhotosDetails = {
  [key: number]: CartPhotoDetails;
};
