import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/app/api/category';
import { Unpacked } from '@/utils/typescript';

interface CategoryQuery
  extends Unpacked<Awaited<ReturnType<typeof getAllCategories>>> {
  hrefKey: string;
}

type CategoriesQuery = {
  [key: string]: CategoryQuery;
};

export function useAllCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getAllCategories().then((categories) =>
        categories.reduce((result: CategoriesQuery, category) => {
          const hrefKey = category.name.toLowerCase().replace(' ', '_');

          result[hrefKey] = {
            ...category,
            hrefKey: hrefKey,
          };

          return result;
        }, {}),
      ),
  });
}
