'use server';

import { DeliveryData } from '@/models/user';
import { verifySession } from '@/server/session';
import prisma from '@/server/prisma';

export async function updateDeliveryData(data: DeliveryData) {
  const session = await verifySession();
  if (!session) {
    return { status: 401 };
  }

  const deliveryData = await prisma.deliveryData.findFirst({
    where: {
      userId: session.userId,
    },
  });

  try {
    if (deliveryData) {
      await prisma.deliveryData.update({
        where: {
          userId: session.userId,
        },
        data,
      });
    } else {
      await prisma.deliveryData.create({
        data: { userId: session.userId, ...data },
      });
    }
  } catch (error) {
    console.error('Error updating delivery data:', error);
    return { status: 500 };
  }

  return { status: 200 };
}
