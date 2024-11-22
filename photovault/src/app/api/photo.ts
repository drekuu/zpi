'use server';

import prisma from './_lib/prisma';
import { getFilePublicUrl } from './_lib/cloud';
import { PhotoFilters } from '@/models/photo';
import _ from 'lodash';

export async function getPhotos(filters: PhotoFilters) {
  const photos = await prisma.photo.findMany({
    where: {
      categories: filters.category
        ? {
            some: {
              id: {
                equals: filters.category,
              },
            },
          }
        : {},
      price:
        filters.priceRange.length !== 0
          ? {
              gte: filters.priceRange[0],
              lte: filters.priceRange[1],
            }
          : {},
      tags:
        filters.tags.length !== 0
          ? {
              some: {
                id: {
                  in: filters.tags,
                },
              },
            }
          : {},
    },
  });

  return photos.map((photo) =>
    _.pick(
      {
        ...photo,
        photoURL: getFilePublicUrl(photo.photoURL),
      },
      ['title', 'photoURL', 'id'],
    ),
  );
}

export async function getPhoto(id: number) {
  const photo = await prisma.photo.findUnique({
    where: {
      id,
    },
    include: {
      photograph: true,
      tags: true,
      categories: true,
    },
  });

  if (!photo) {
    return null;
  }

  return _.pick(
    {
      ...photo,
      tags: photo.tags.map((tag) => _.pick(tag, ['id', 'name'])),
      categories: photo.categories.map((category) =>
        _.pick(category, ['id', 'name']),
      ),
      price: photo.price.toNumber(),
      licensePrice: photo.licensePrice.toNumber(),
      photoURL: getFilePublicUrl(photo.photoURL),
    },
    [
      'title',
      'photoURL',
      'id',
      'price',
      'tags',
      'licensePrice',
      'categories',
      'photograph.displayedUserName',
      'photograph.avatarURL',
    ],
  );
}
