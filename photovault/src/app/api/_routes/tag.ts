import 'server-only';
import prisma from '@/server/prisma';
import _ from 'lodash';
import { publicProcedure } from '@/server/trpc';

export const getAllTags = publicProcedure.query(async () => {
  const tags = await prisma.tag.findMany();
  return tags.map((tag) => _.pick(tag, ['id', 'name']));
});
