import { Unpacked } from '@/utils/typescript';
import { getAllTags } from '@/app/api/tag';

export type Tag = Unpacked<Awaited<ReturnType<typeof getAllTags>>>;
export type Tags = {
  [key: string]: Tag;
};
