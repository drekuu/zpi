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

export async function getPhotosByPhotographer(username: string) {
  const photos = await prisma.photo.findMany({
    where: {
      photograph: {
        user: {
          is: {
            username: username,
          },
        },
      },
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
