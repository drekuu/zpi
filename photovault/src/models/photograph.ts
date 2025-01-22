import { Unpacked } from '@/utils/typescript';
import type { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@/server';

type RouterOutput = inferRouterOutputs<AppRouter>;

export type FeaturedPhotographer = Unpacked<
  Awaited<RouterOutput['photograph']['getFeaturedPhotographers']>
>;
