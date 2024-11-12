import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const requestBody = await req.json();
  const { username, password, email, description } = requestBody;

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
    return new NextResponse(
      JSON.stringify({ status: 'Email or username already exists' }),
      { status: 403 },
    );
  }

  return new NextResponse(
    JSON.stringify({ status: 'Sucessfully created new user' }),
    { status: 201 },
  );
}
