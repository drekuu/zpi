import 'server-only';
import prisma from '@/server/prisma';
import _ from 'lodash';
import { publicProcedure } from '@/server/trpc';
import { Unpacked } from '@/utils/typescript';

export const getAllTags = publicProcedure.query(async () => {
  const tags = await prisma.tag.findMany();
  const tagsSanitated = tags.map((tag) => _.pick(tag, ['id', 'name']));

  type Tag = Unpacked<typeof tagsSanitated>;
  type Tags = {
    [id: string]: Tag;
  };

  return tagsSanitated.reduce((result: Tags, tag) => {
    result[tag.name] = tag;
    return result;
  }, {});
});
