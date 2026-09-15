import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const userRole = req.auth?.user?.role as string | undefined;

  // Protect dashboard routes based on roles
  if (nextUrl.pathname.startsWith('/admin') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', nextUrl));
  }
  
  if (nextUrl.pathname.startsWith('/staff') && userRole !== 'STAFF' && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  if (nextUrl.pathname.startsWith('/client') && userRole !== 'CLIENT' && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  if (nextUrl.pathname.startsWith('/associate') && userRole !== 'ASSOCIATE' && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
