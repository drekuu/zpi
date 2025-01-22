import { trpc } from '@/trpc/client';
import { Tag, Tags } from '@/models/tag';

export function useTags() {
  return trpc.tag.getAllTags.useQuery();
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
