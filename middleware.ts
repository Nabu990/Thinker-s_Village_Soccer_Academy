import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth-edge'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/about', '/contact', '/gallery', '/auth/login', '/auth/register']
  
  // Check if the path is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  )

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Get token from cookies or headers
  const token = request.cookies.get('token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    // Redirect to login if no token and trying to access protected route
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Verify token
  const payload = await verifyToken(token)
  if (!payload) {
    // Token is invalid, redirect to login
    const response = NextResponse.redirect(new URL('/auth/login', request.url))
    response.cookies.delete('token')
    return response
  }

  // Role-based access control
  if (pathname.startsWith('/dashboard/manager') && payload.role !== 'MANAGER') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (pathname.startsWith('/dashboard/player') && payload.role !== 'PLAYER') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Add user info to headers for server-side use
  const response = NextResponse.next()
  response.headers.set('x-user-id', payload.userId)
  response.headers.set('x-user-role', payload.role)
  response.headers.set('x-user-email', payload.email)

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
