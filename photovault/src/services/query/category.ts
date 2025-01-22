import { trpc } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/app/api/category';
import { Category, Categories } from '@/models/category';

export function useCategories() {
  return trpc.category.getAllCategories.useQuery();
  return useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getAllCategories().then((categories) =>
        categories.map((category) => ({
          ...category,
          hrefKey: category.name.toLowerCase().replace(' ', '_'),
        })),
      ),
  });
}

export function mapCategoriesByHrefKey(categories?: Array<Category>) {
  return categories?.reduce((result: Categories, category) => {
    result[category.hrefKey] = category;
    return result;
  }, {});
}

export function mapCategoriesById(categories?: Array<Category>) {
  return categories?.reduce((result: Categories, category) => {
    result[category.id] = category;
    return result;
  }, {});
}
