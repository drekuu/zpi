'use server';

import prisma from './_lib/prisma';
import _ from 'lodash';

export async function getAllTags() {
  const tags = await prisma.tag.findMany();

  return _.map(tags, (tag) => _.pick(tag, ['id', 'name']));
}
