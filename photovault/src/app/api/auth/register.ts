'use server';

import bcrypt from 'bcrypt';
import prisma from '@/app/api/_lib/prisma';

export async function signup(
  username: string,
  password: string,
  email: string,
  description?: string,
) {
  // TODO: validate password, email here
  //  see https://nextjs.org/docs/app/building-your-application/authentication#2-validate-form-fields-on-the-server
  // TODO: email or username already exists is shown on all exceptions

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const createdUser = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });

    if (description) {
      await prisma.photograph.create({
        data: {
          description: description,
          userId: createdUser!.id,
        },
      });
    }
  } catch {
    return {
      status: 403,
      content: 'Email or username already exists',
    };
  }

  return { status: 200, content: 'ok' };
}
