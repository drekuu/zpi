'use server';

import prisma from './_lib/prisma';
import { deleteFile, getFilePublicUrl, putFile } from './_lib/cloud';
import { Photo, PhotoFilters } from '@/models/photo';
import { StreamingBlobPayloadInputTypes } from '@smithy/types';
import _ from 'lodash';
import { verifySession } from './_lib/session';

export async function getPhotos(filters?: PhotoFilters) {
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
}

export async function getPhoto(id: number) {
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
}

export async function getPhotosByIds(ids: Array<number>) {
  const photos = await prisma.photo.findMany({
    where: {
      id: { in: ids },
    },
  });

  if (photos?.length === 0) {
    return null;
  }

  return photos.map((photo) =>
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
}

export async function getPhotosByPhotographer(username: string) {
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
}

export async function getPhotosByPhotographerWithDetails(username: string) {
  const photos = await prisma.photo.findMany({
    where: {
      photograph: {
        user: {
          username: username,
        },
      },
    },
    include: {
      tags: true,
      categories: true,
    },
  });

  return photos.map((photo) => {
    return {
      ...photo,
      photoURL: getFilePublicUrl(photo.photoURL),
      tags: photo.tags.map((tag) => tag.name),
      categories: photo.categories.map((category) => category.name),
    };
  });
}

export async function putPhoto(
  photoname: string,
  photofile: FormData,
  photo: Photo,
) {
  console.log(photo);
  console.log(photoname);
  const session = await verifySession();
  const prismaResponse = await prisma.photo.create({
    data: {
      photographId: session!!.photographId!!,
      photoURL: photoname,
      title: photo.title,
      license: !!photo.license,
      tags: {
        connect: photo.tags.map((tagId) => ({ id: tagId })),
      },
      price: photo.price,
      licensePrice: photo.licensePrice ?? 0,
      categories: {
        connect: photo.categories.map((categoryId) => ({ id: categoryId })),
      },
    },
  });

  const keyName = prismaResponse.id + photoname;

  await prisma.photo.update({
    where: {
      id: prismaResponse.id,
    },
    data: {
      photoURL: keyName,
    },
  });

  const file = photofile.get('image') as File;
  const arrayBuffer = await file.arrayBuffer();
  console.log(arrayBuffer);
  await putFile(keyName, Buffer.from(arrayBuffer));

  return { status: 200, content: 'ok' };
}

export async function updatePhoto(photo: Photo) {
  console.log(photo)
  const res = await prisma.photo.update({
    where: {
      id: photo.id,
    },
    data: {
      title: photo.title,
      license: !!photo.license,
      tags: {
        set: photo.tags.map((tagId) => ({ id: tagId })),
      },
      price: photo.price,
      licensePrice: photo.licensePrice ?? 0,
      categories: {
        set: photo.categories.map((categoryId) => ({ id: categoryId })),
      },
    },
  });
  console.log(res)

  return { status: 200, content: 'ok' };
}


export async function deletePhoto(id: number) {

  const photo = await prisma.photo.findUnique({
    where: {
      id,
    },
  });

  if (!photo) {
    return { status: 404, content: 'Photo not found' };
  }

  await prisma.photo.delete({
    where: {
      id,
    },
  });

  await deleteFile(photo.photoURL);

  return { status: 200, content: 'ok' };
}