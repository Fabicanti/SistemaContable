import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/register', '/home'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token')?.value;

  const isPublic = PUBLIC_PATHS.includes(pathname);

  if (!token && !isPublic) {
    // No autenticado y quiere entrar a ruta privada -> redirige a login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isPublic) {
    // Ya autenticado y quiere ir a login/register/home -> redirige al dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/home'],
};
