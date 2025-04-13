import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes user can access without being logged in
const publicRoutes = ['/', '/login', '/register', '/forgot-password']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value

  const path = request.nextUrl.pathname

  const isPublic = publicRoutes.includes(path)

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = { 
    matcher: [
      '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
  }
  