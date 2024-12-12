'use server';

import _ from 'lodash';
import prisma from './_lib/prisma';
import { verifySession } from '@/app/api/_lib/session';
import { PhotographUpdateData } from '@/models/photograph';
import { redirect } from 'next/navigation';
import { getFilePublicUrl } from '@/app/api/_lib/cloud';

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

  return photograph
    ? _.pick(
        {
          ...photograph,
          avatarURL: photograph.avatarURL
            ? getFilePublicUrl(photograph.avatarURL)
            : null,
        },
        ['displayedUserName', 'avatarURL', 'description', 'user.email'],
      )
    : null;
}

export async function getFeaturedPhotographers() {
  const photographers = await prisma.photograph.findMany({
    where: {
      photo: {
        some: {},
      },
    },
    include: {
      user: true,
      photo: true,
    },
  });

  return photographers.map((photograph) =>
    _.pick(
      {
        ...photograph,
        avatarURL: photograph.avatarURL
          ? getFilePublicUrl(photograph.avatarURL)
          : null,
        photo: photograph.photo
          .slice(0, 2) // take max two photos
          .map((p) =>
            _.pick({ ...p, photoURL: getFilePublicUrl(p.photoURL) }, [
              'id',
              'photoURL',
              'title',
            ]),
          ),
      },
      [
        'id',
        'displayedUserName',
        'avatarURL',
        'description',
        'user.username',
        'photo',
      ],
    ),
  );
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
  });

  return photograph
    ? _.pick(
        {
          ...photograph,
          avatarURL: photograph.avatarURL
            ? getFilePublicUrl(photograph.avatarURL)
            : null,
        },
        ['displayedUserName', 'avatarURL', 'description', 'displayedEmail'],
      )
    : null;
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
