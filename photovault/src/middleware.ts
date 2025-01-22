import { NextRequest, NextResponse } from 'next/server';
import { decryptSession } from '@/server/session';
import { cookies } from 'next/headers';

const photographProtectedRoutes = ['/profile'];
const protectedRoutes = [...photographProtectedRoutes];
const publicRoutes = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPhotographProtectedRoute = photographProtectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if (!isProtectedRoute && !isPublicRoute) {
    return NextResponse.next();
  }

  const cookie = cookies().get('session')?.value;
  if (!cookie) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    return NextResponse.next();
  }

  const session = await decryptSession(cookie);
  if (!session) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    return NextResponse.next();
  }

  if (isPublicRoute && session.userId) {
    return NextResponse.redirect(new URL('/home', req.nextUrl));
  }

  if (isPhotographProtectedRoute && !session.isPhotograph) {
    return NextResponse.redirect(new URL('/home', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
