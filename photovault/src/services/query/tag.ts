import { useQuery } from '@tanstack/react-query';
import { getAllTags } from '@/app/api/tag';
import { Tags } from '@/models/tag';

export function useAllTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () =>
      getAllTags().then((tags) =>
        tags.reduce((result: Tags, tag) => {
          result[tag.name] = tag;
          return result;
        }, {}),
      ),
  });
}
