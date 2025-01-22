import { trpc } from '@/trpc/client';
import { Category, Categories } from '@/models/category';

export function useCategories() {
  return trpc.category.getAllCategories.useQuery();
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
