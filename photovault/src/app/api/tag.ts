'use server';

import prisma from './_lib/prisma';
import _ from 'lodash';

export async function getAllTags() {
  const tags = await prisma.tag.findMany();

  return tags.map((tag) => _.pick(tag, ['id', 'name']));
}
