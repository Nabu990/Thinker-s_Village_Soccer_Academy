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
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    // Build query
    const where: any = {}
    
    if (search) {
      where.user = {
        name: { contains: search, mode: 'insensitive' }
      }
    }
    
    if (status && status !== 'all') {
      where.status = status.toUpperCase() as any
    }

    const coaches = await prisma.coach.findMany({
      where,
      include: {
        user: {
          select: { name: true, email: true, phoneNumber: true }
        }
      },
      orderBy: { joiningDate: 'desc' }
    })

    return NextResponse.json({ coaches })
  } catch (error) {
    console.error('Error fetching coaches:', error)
    return NextResponse.json(
      { error: 'Failed to fetch coaches' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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

    const coachData = await request.json()

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: coachData.userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const coach = await prisma.coach.create({
      data: {
        ...coachData,
        teams: coachData.teams || [],
        status: coachData.status?.toUpperCase() as any || 'ACTIVE'
      },
      include: {
        user: {
          select: { name: true, email: true, phoneNumber: true }
        }
      }
    })

    return NextResponse.json(coach, { status: 201 })
  } catch (error) {
    console.error('Error creating coach:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create coach' },
      { status: 500 }
    )
  }
}
