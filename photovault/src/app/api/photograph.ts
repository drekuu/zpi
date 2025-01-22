'use server';

import prisma from '@/server/prisma';
import { verifySession } from '@/server/session';
import { PhotographUpdateData } from '@/models/photograph';
import { deleteFile, putFile } from '@/server/cloud';

export async function updateMyself(
  photoname: string,
  photofile: FormData,
  data: PhotographUpdateData,
) {
  const session = await verifySession();
  if (!session) {
    return { status: 401 };
  }
  const photographdata = await prisma.photograph.findFirst({
    where: {
      userId: session.userId,
    },
  });
  if (!photographdata) {
    return { status: 404 };
  }
  if (photographdata.avatarURL) {
    await deleteFile(photographdata.avatarURL);
  }
  const keyName = 'avatar/' + session.userId + photoname;
  const file = photofile.get('image') as File;
  const arrayBuffer = await file.arrayBuffer();
  await putFile(keyName, Buffer.from(arrayBuffer));

  try {
    const updatedPhotograph = await prisma.photograph.update({
      where: {
        userId: session.userId,
      },
      data: {
        displayedUserName: data.displayedUserName,
        avatarURL: keyName,
        description: data.aboutMe,
        displayedEmail: data.email,
      },
    });

    return { status: 200, photograph: updatedPhotograph };
  } catch (error) {
    console.error('Error updating photograph:', error);
    return { status: 500 };
  }
}
