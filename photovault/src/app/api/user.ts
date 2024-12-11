'use server';

import _ from 'lodash';
import prisma from './_lib/prisma';
import { verifySession } from '@/app/api/_lib/session';

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
      deliveryData: true,
    },
  });

  return user
    ? _.pick(user, [
        'email',
        'deliveryData.name',
        'deliveryData.surname',
        'deliveryData.country',
        'deliveryData.city',
        'deliveryData.street',
        'deliveryData.zipCode',
        'deliveryData.telephone',
      ])
    : null;
}
