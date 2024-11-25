'use server';

import { verifySession } from './_lib/session';
import prisma from '@/app/api/_lib/prisma';
import _ from 'lodash';

export async function getMyself() {
  const session = await verifySession();
  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    include: {
      photograph: true,
    },
  });

  return _.pick(user, ['id', 'email', 'username']);
}
