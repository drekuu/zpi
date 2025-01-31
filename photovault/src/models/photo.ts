import { Unpacked, ValueOf } from '@/utils/typescript';
import type { inferRouterOutputs, inferRouterInputs } from '@trpc/server';
import type { AppRouter } from '@/server';

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type PhotoFilters = RouterInput['photo']['getPhotos'];
export type GalleryPhoto = NonNullable<
  Unpacked<Awaited<RouterOutput['photo']['getPhoto']>>
>;
export type FullPhoto = NonNullable<Awaited<RouterOutput['photo']['getPhoto']>>;
export type CartPhotosDetails = NonNullable<
  Awaited<RouterOutput['photo']['getPhotosByIds']>
>;
export type CartPhotoDetails = ValueOf<CartPhotosDetails>;
export type ManagementTablePhoto = Unpacked<
  Awaited<RouterOutput['photo']['getPhotosByPhotographerWithDetails']>
>;
