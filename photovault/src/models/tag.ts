import { Unpacked } from '@/utils/typescript';
import type { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@/server';

type RouterOutput = inferRouterOutputs<AppRouter>;

export type Tag = Unpacked<Awaited<RouterOutput['tag']['getAllTags']>>;
export type Tags = {
  [key: string | number]: Tag;
};
