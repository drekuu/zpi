import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('Missing JWT_SECRET_KEY environment variable');
}

export async function POST(req: Request) {
  const requestBody = await req.json();
  const { password, email } = requestBody;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (user == null) {
    return new NextResponse(
      JSON.stringify({ status: 'Email or password incorrect' }),
      { status: 403 },
    );
  }

  const passMatches = await bcrypt.compare(password, user.password);
  if (!passMatches) {
    return new NextResponse(
      JSON.stringify({ status: 'Email or password incorrect' }),
      { status: 403 },
    );
  } else {
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      SECRET_KEY!,
      {
        expiresIn: '10h',
      },
    );

    return new NextResponse(JSON.stringify({ token }), { status: 200 });
  }
}
