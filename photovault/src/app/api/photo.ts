'use server';

import prisma from './_lib/prisma';
import { getFilePublicUrl } from './_lib/cloud';

export async function getPhotos() {
  const photos = await prisma.photo.findMany();

  return photos.map((photo) => ({
    ...photo,
    photoURL: getFilePublicUrl(photo.photoURL),
  }));
}
