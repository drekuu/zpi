import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/app/api/category';

export function useAllCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories().then((categories) => categories),
  });
}
