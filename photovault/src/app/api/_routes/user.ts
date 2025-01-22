import 'server-only';
import _ from 'lodash';
import prisma from '@/server/prisma';
import { verifySession } from '@/server/session';
import { publicProcedure } from '@/server/trpc';

export const getMyself = publicProcedure.query(async () => {
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
});
