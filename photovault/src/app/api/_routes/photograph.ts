import 'server-only';
import _ from 'lodash';
import prisma from '../../../server/prisma';
import { verifySession } from '@/server/session';
import { getFilePublicUrl } from '@/server/cloud';
import { publicProcedure } from '@/server/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const getPhotographer = publicProcedure
  .input(
    z.object({
      name: z.string(),
    }),
  )
  .query(async (opts) => {
    const { name } = opts.input;

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
  });

export const getFeaturedPhotographers = publicProcedure.query(async () => {
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
});

export const getMyself = publicProcedure.query(async () => {
  const session = await verifySession();
  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
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
});
