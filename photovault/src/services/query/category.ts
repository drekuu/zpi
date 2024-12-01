import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/app/api/category';
import { Categories } from '@/models/category';

export function useAllCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getAllCategories().then((categories) =>
        categories.reduce((result: Categories, category) => {
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
