import 'server-only';
import prisma from '../../../server/prisma';
import _ from 'lodash';
import { publicProcedure } from '@/server/trpc';
import { Unpacked } from '@/utils/typescript';

export const getAllCategories = publicProcedure.query(async () => {
  const categories = await prisma.category.findMany();
  const categoriesSanitated = categories.map((category) =>
    _.pick(
      { ...category, hrefKey: category.name.toLowerCase().replace(' ', '_') },
      ['id', 'name', 'hrefKey'],
    ),
  );

  type Category = Unpacked<typeof categoriesSanitated>;
  type Categories = {
    [id: string]: Category;
  };

  return categoriesSanitated.reduce((result: Categories, category) => {
    result[category.hrefKey] = category;
    return result;
  }, {});
});
