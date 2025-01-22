'use server';

import bcrypt from 'bcrypt';
import prisma from '../../../server/prisma';
import { RegisterData } from '@/models/register';

export async function signup(data: RegisterData) {
  // TODO: validate password, email here
  //  see https://nextjs.org/docs/app/building-your-application/authentication#2-validate-form-fields-on-the-server
  // TODO: email or username already exists is shown on all exceptions

  const hashedPassword = await bcrypt.hash(data.password, 10);
  try {
    const createdUser = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
      },
    });

    if (data.photograph) {
      await prisma.photograph.create({
        data: {
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
