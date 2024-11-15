'use server';

import bcrypt from 'bcrypt';
import prisma from '@/app/api/_lib/prisma';
import { createSession } from '../_lib/session';
import _ from 'lodash';

export async function signin(email: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    include: {
      photograph: true,
    },
  });

  if (user === null) {
    return {
      status: 403,
      content: 'Email or password incorrect',
    };
  }

  const passMatches = await bcrypt.compare(password, user.password);
  if (!passMatches) {
    return { status: 403, content: 'Email or password incorrect' };
  }

  await createSession({
    userId: user.id,
    isPhotograph: !!user.photograph,
  });

  return {
    status: 200,
    content: JSON.stringify(
      _.pick(user, ['email', 'username', 'photograph.description']),
    ),
  };
}
