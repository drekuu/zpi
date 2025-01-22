import { Unpacked } from '@/utils/typescript';
import type { inferRouterOutputs, inferRouterInputs } from '@trpc/server';
import type { AppRouter } from '@/server';

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type PhotoFilters = RouterInput['photo']['getPhotos'];
export type GalleryPhoto = NonNullable<
  Unpacked<Awaited<RouterOutput['photo']['getPhoto']>>
>;
export type FullPhoto = NonNullable<Awaited<RouterOutput['photo']['getPhoto']>>;
