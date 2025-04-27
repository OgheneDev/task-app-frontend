import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes user can access without being logged in
const publicRoutes = ['/', '/login', '/register', '/forgot-password']

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip middleware for API routes
  if (path.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check for the frontend token cookie
  const token = request.cookies.get('frontendToken')?.value;
  const isPublic = publicRoutes.includes(path);
  
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (token && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = { 
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
