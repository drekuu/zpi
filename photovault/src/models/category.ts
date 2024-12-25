import { Unpacked } from '@/utils/typescript';
import { getAllCategories } from '@/app/api/category';

export type Category = Unpacked<
  Awaited<ReturnType<typeof getAllCategories>>
> & {
  hrefKey: string;
};

export type Categories = {
  [key: string | number]: Category;
};
