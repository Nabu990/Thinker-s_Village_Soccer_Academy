import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth-prisma'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== 'MANAGER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role') || ''

    // Build query
    const where: any = {}
    
    if (role && role !== 'all') {
      where.role = role.toUpperCase() as 'MANAGER' | 'FAN' | 'PLAYER' | 'COACH'
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profileImage: true,
        phoneNumber: true,
        address: true,
        dateOfBirth: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        player: {
          select: { id: true }
        },
        coach: {
          select: { id: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform data to match expected format
    const usersWithProfiles = users.map(user => ({
      ...user,
      hasPlayerProfile: !!user.player,
      hasCoachProfile: !!user.coach,
      player: undefined,
      coach: undefined
    }))

    return NextResponse.json({ users: usersWithProfiles })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
