import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '@/lib/auth-prisma'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json()

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Email, password, and role are required' },
        { status: 400 }
      )
    }

    let result

    // Handle admin login for manager/coach/player with admin123
    if (role !== 'fan' && password === 'admin123') {
      // Create mock user for admin access
      const mockUser = {
        id: 'admin-' + role,
        email: email,
        name: role.charAt(0).toUpperCase() + role.slice(1) + ' User',
        role: role.toUpperCase(),
        profileImage: null
      }

      // Generate token for admin user
      const { createToken } = await import('@/lib/auth-prisma')
      const token = createToken(mockUser)

      result = {
        user: mockUser,
        token: token
      }
    } else if (role === 'fan') {
      // Normal fan authentication
      result = await authenticateUser(email, password)
    } else if (role === 'player') {
      // Player authentication - check if approved
      result = await authenticateUser(email, password)
      if (result && result.user) {
        // Check if player is approved
        const player = await prisma.player.findFirst({
          where: { userId: result.user.id }
        })

        if (!player || player.status !== 'ACTIVE') {
          return NextResponse.json(
            { error: 'Your player account is pending manager approval. Please check back later.' },
            { status: 403 }
          )
        }
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid admin password. Use admin123 for manager/coach access' },
        { status: 401 }
      )
    }

    const response = NextResponse.json(result)
    response.cookies.set('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Login failed' },
      { status: 401 }
    )
  }
}
