import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith('/cadastro-livro');

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/', request.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cadastro-livro', '/'],
};
