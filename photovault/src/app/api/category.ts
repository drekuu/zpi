'use server';

import prisma from './_lib/prisma';
import _ from 'lodash';

export async function getAllCategories() {
  const categories = await prisma.category.findMany();

  return _.map(categories, (category) => _.pick(category, ['id', 'name']));
}