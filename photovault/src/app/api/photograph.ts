'use server';

import _ from 'lodash';
import prisma from './_lib/prisma';
import { verifySession } from '@/app/api/_lib/session';
import { PhotographUpdateData } from '@/models/photograph';
import { redirect } from 'next/navigation';

export async function getPhotographer(name: string) {
  const photograph = await prisma.photograph.findFirst({
    where: {
      user: {
        is: {
          username: name,
        },
      },
    },
    include: {
      user: true,
    },
  });

  return _.pick(photograph, [
    'displayedUserName',
    'avatarUrl',
    'description',
    'user.email',
  ]);
}

export async function getMyself() {
  const session = await verifySession();
  if (!session) {
    redirect('/login');
  }

  if (!session.isPhotograph) {
    return null;
  }

  const photograph = await prisma.photograph.findUnique({
    where: {
      userId: session.userId,
    },
    include: {
      user: true,
    },
  });

  return _.pick(photograph, [
    'displayedUserName',
    'avatarUrl',
    'description',
    'user.email',
  ]);
}

export async function updateMyself(data: PhotographUpdateData) {
  const session = await verifySession();
  if (!session) {
    return { status: 401 };
  }

  try {
    const updatedPhotograph = await prisma.photograph.update({
      where: {
        userId: session.userId,
      },
      data: {
        displayedUserName: data.displayedUserName,
        avatarURL: data.avatarUrl,
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
