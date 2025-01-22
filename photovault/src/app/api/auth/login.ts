'use server';

import bcrypt from 'bcrypt';
import prisma from '../../../server/prisma';
import { createSession } from '../../../server/session';
import { UserData } from '@/models/user';

type SigninResult = {
  status: number;
  content: string | UserData;
};

export async function signin(
  email: string,
  password: string,
): Promise<SigninResult> {
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
    content: {
      email: user.email,
      username: user.username,
      isPhotograph: !!user.photograph,
    },
  };
}
