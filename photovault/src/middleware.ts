import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/app/api/_lib/session';
import { cookies } from 'next/headers';

const protectedRoutes = ['/profile'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const cookie = cookies().get('session')?.value;
  if (!cookie) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  const session = await decrypt(cookie);
  if (!session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
