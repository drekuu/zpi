'use server';

import prisma from '@/server/prisma';
import { deleteFile, putFile } from '@/server/cloud';
import { ManagementTablePhoto } from '@/models/photo';
import { verifySession } from '@/server/session';
import { preprocessImage } from '@/server/image';

export async function putPhoto(
  photoname: string,
  photofile: FormData,
  photo: ManagementTablePhoto,
) {
  const session = await verifySession();
  if (!session || !session.photographId) {
    return null;
  }

  const file = photofile.get('image') as File;
  const arrayBuffer = await file.arrayBuffer();

  const processedImageBuffer = await preprocessImage(Buffer.from(arrayBuffer));
  if (!processedImageBuffer) {
    return { status: 500, content: 'failed to preprocess image' };
  }

  const prismaResponse = await prisma.photo.create({
    data: {
      photographId: session.photographId,
      photoURL: photoname,
      title: photo.title,
      license: photo.license,
      tags: {
        connect: photo.tags.map((tag) => ({ id: tag })),
      },
      price: photo.price,
      licensePrice: photo.licensePrice ?? 0,
      categories: {
        connect: photo.categories.map((category) => ({ id: category })),
      },
    },
  });

  const keyName = crypto.randomUUID() + '.webp';

  await prisma.photo.update({
    where: {
      id: prismaResponse.id,
    },
    data: {
      photoURL: keyName,
    },
  });

  await putFile(keyName, processedImageBuffer);
  return { status: 200, content: 'ok' };
}

export async function updatePhoto(photo: ManagementTablePhoto) {
  await prisma.photo.update({
    where: {
      id: photo.id,
    },
    data: {
      title: photo.title,
      license: photo.license,
      tags: {
        set: photo.tags.map((tag) => ({ id: tag })),
      },
      price: photo.price,
      licensePrice: photo.licensePrice ?? 0,
      categories: {
        set: photo.categories.map((category) => ({ id: category })),
      },
    },
  });

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
