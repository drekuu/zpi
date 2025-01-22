import 'server-only';
import prisma from '../../../server/prisma';
import { getFilePublicUrl } from '@/server/cloud';
import _ from 'lodash';
import { publicProcedure } from '@/server/trpc';
import { z } from 'zod';
import { Unpacked } from '@/utils/typescript';

const photoFilterSchema = z
  .object({
    /**
     * Category ID
     */
    category: z.number().optional(),

    /**
     * Tuple containing minimum and maximum price
     */
    priceRange: z.tuple([z.number(), z.number()]).optional(),

    /**
     * List of tag IDs
     */
    tags: z.array(z.number()),
  })
  .optional();

export const getPhotos = publicProcedure
  .input(photoFilterSchema)
  .query(async (opts) => {
    const filters = opts.input;

    const photos = await prisma.photo.findMany({
      where: filters
        ? {
            categories: filters.category
              ? {
                  some: {
                    id: {
                      equals: filters.category,
                    },
                  },
                }
              : {},
            price: filters.priceRange
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
          }
        : {},
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
  });

export const getPhoto = publicProcedure
  .input(
    z.object({
      id: z.number(),
    }),
  )
  .query(async (opts) => {
    const { id } = opts.input;

    const photo = await prisma.photo.findUnique({
      where: {
        id,
      },
      include: {
        photograph: {
          include: {
            user: true,
          },
        },
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
        photograph: {
          ...photo.photograph,
          avatarURL: photo.photograph.avatarURL
            ? getFilePublicUrl(photo.photograph.avatarURL)
            : null,
        },
      },
      [
        'title',
        'photoURL',
        'id',
        'price',
        'tags',
        'license',
        'licensePrice',
        'categories',
        'photograph.displayedUserName',
        'photograph.avatarURL',
        'photograph.user.username',
      ],
    );
  });

export const getPhotosByIds = publicProcedure
  .input(
    z.object({
      ids: z.array(z.number()),
    }),
  )
  .query(async (opts) => {
    const { ids } = opts.input;

    const photos = await prisma.photo.findMany({
      where: {
        id: { in: ids },
      },
    });

    if (photos?.length === 0) {
      return null;
    }

    const photosSanitated = photos.map((photo) =>
      _.pick(
        {
          ...photo,
          price: photo.price.toNumber(),
          licensePrice: photo.licensePrice.toNumber(),
          photoURL: getFilePublicUrl(photo.photoURL),
        },
        ['title', 'photoURL', 'id', 'price', 'license', 'licensePrice'],
      ),
    );

    type Photo = Unpacked<typeof photosSanitated>;
    type Photos = {
      [id: number]: Photo;
    };

    return photosSanitated.reduce((result: Photos, photo) => {
      result[photo.id!] = photo;
      return result;
    }, {});
  });

export const getPhotosByPhotographer = publicProcedure
  .input(
    z.object({
      username: z.string(),
    }),
  )
  .query(async (opts) => {
    const { username } = opts.input;

    const photos = await prisma.photo.findMany({
      where: {
        photograph: {
          user: {
            username: username,
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
  });
