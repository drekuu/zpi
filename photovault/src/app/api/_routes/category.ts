import 'server-only';
import prisma from '../../../server/prisma';
import _ from 'lodash';
import { publicProcedure } from '@/server/trpc';

export const getAllCategories = publicProcedure.query(async () => {
  const categories = await prisma.category.findMany();
  return categories.map((category) =>
    _.pick(
      { ...category, hrefKey: category.name.toLowerCase().replace(' ', '_') },
      ['id', 'name', 'hrefKey'],
    ),
  );
});
