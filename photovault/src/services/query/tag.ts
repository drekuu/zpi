import { useQuery } from '@tanstack/react-query';
import { getAllTags } from '@/app/api/tag';

export function useAllTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => getAllTags().then((tags) => tags),
  });
}
