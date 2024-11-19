import { useQuery } from '@tanstack/react-query';
import { getAllTags } from '@/app/api/tag';
import { Unpacked } from '@/utils/typescript';

type TagQuery = Unpacked<Awaited<ReturnType<typeof getAllTags>>>;
type TagsQuery = {
  [key: string]: TagQuery;
};

export function useAllTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () =>
      getAllTags().then((tags) =>
        tags.reduce((result: TagsQuery, tag) => {
          result[tag.name] = tag;
          return result;
        }, {}),
      ),
  });
}
