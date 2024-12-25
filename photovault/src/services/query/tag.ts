import { useQuery } from '@tanstack/react-query';
import { getAllTags } from '@/app/api/tag';
import { Tag, Tags } from '@/models/tag';

export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => getAllTags().then((tags) => tags),
  });
}

export function mapTagsByName(tags?: Array<Tag>) {
  return tags?.reduce((result: Tags, tag) => {
    result[tag.name] = tag;
    return result;
  }, {});
}

export function mapTagsById(tags?: Array<Tag>) {
  return tags?.reduce((result: Tags, tag) => {
    result[tag.id] = tag;
    return result;
  }, {});
}
