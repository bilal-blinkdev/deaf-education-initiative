import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUser } from './app/(frontend)/(authenticated)/_actions/getUser';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = request.cookies.get('payload-token');

  if (request.nextUrl.pathname === '/login' && user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}
