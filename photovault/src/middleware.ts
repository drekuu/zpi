import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/profile'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  if (protectedPaths.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: protectedPaths,
};
