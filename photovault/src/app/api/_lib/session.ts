import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { UserSession } from '@/models/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_DURATION_TEXT = '10h';
const SESSION_DURATION = 10 * 60 * 60 * 1000;

const SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error('Missing JWT_SECRET_KEY environment variable');
}

const ENCODED_KEY = new TextEncoder().encode(SECRET_KEY);

export async function encryptSession(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION_TEXT)
    .sign(ENCODED_KEY);
}

export async function decryptSession(session?: string) {
  if (!session) {
    console.error('[session:decrypt] no session provided');
  }

  try {
    const { payload } = await jwtVerify(session!, ENCODED_KEY, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch (error) {
    console.error('[session:decrypt] failed to verify session, error: ', error);
  }
}

export async function createSession(userSession: UserSession) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  const session = await encryptSession(userSession);

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'strict',
    path: '/',
  });
}

export async function updateSession() {
  const session = cookies().get('session')?.value;
  if (!session) {
    return null;
  }

  const payload = await decryptSession(session);
  if (!payload) {
    return null;
  }

  const expires = new Date(Date.now() + SESSION_DURATION);

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'strict',
    path: '/',
  });
}

export async function deleteSession() {
  cookies().delete('session');
}

export async function verifySession() {
  const session = cookies().get('session')?.value;
  if (session) {
    const payload = await decryptSession(session);

    if (payload?.userId) {
      return payload as UserSession;
    }
  }

  redirect('/login');
}
