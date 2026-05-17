import { NextRequest, NextResponse } from 'next/server'
import { createUser, authenticateUser } from '@/lib/auth-prisma'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role, phoneNumber, address, dateOfBirth, jerseyNumber, position, height, weight, preferredFoot } = await request.json()

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Name, email, password, and role are required' },
        { status: 400 }
      )
    }

    if (!['manager', 'fan', 'player', 'coach'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role specified' },
        { status: 400 }
      )
    }

    const user = await createUser({
      name,
      email,
      password,
      role: role.toUpperCase() as 'MANAGER' | 'FAN' | 'PLAYER' | 'COACH',
      phoneNumber: phoneNumber || '',
      address: address || '',
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      isActive: role === 'player' ? false : true // Players need approval
    })

    // If role is player, create player profile with pending status
    if (role === 'player') {
      if (!jerseyNumber || !position) {
        return NextResponse.json(
          { error: 'Jersey number and position are required for player registration' },
          { status: 400 }
        )
      }

      // Check if jersey number already exists
      const existingPlayer = await prisma.player.findFirst({
        where: {
          jerseyNumber: parseInt(jerseyNumber),
          team: 'U_15' // Default team for new registrations
        }
      })

      if (existingPlayer) {
        return NextResponse.json(
          { error: 'Jersey number already exists for this team' },
          { status: 400 }
        )
      }

      // Create player profile
      await prisma.player.create({
        data: {
          userId: user.id,
          jerseyNumber: parseInt(jerseyNumber),
          position: position.toUpperCase(),
          height: height ? parseInt(height) : null,
          weight: weight ? parseInt(weight) : null,
          preferredFoot: preferredFoot?.toUpperCase() || 'RIGHT',
          team: 'U_15',
          status: 'PENDING', // Players start as pending
          speed: 50,
          shooting: 50,
          passing: 50,
          dribbling: 50,
          defending: 50,
          physical: 50
        }
      })

      // Return user info but don't authenticate (pending approval)
      return NextResponse.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive
        },
        message: 'Player registration submitted successfully. Awaiting manager approval.'
      })
    }

    // For non-player roles, authenticate immediately
    const result = await authenticateUser(email, password)

    const response = NextResponse.json(result)
    response.cookies.set('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Registration failed' },
      { status: 400 }
    )
  }
}
