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
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const team = searchParams.get('team') || ''
    const status = searchParams.get('status') || ''

    const skip = (page - 1) * limit

    // Build query
    const where: any = {}
    
    if (search) {
      where.user = {
        name: { contains: search, mode: 'insensitive' }
      }
    }
    
    if (team && team !== 'all') {
      where.team = team.toUpperCase() as any
    }
    
    if (status && status !== 'all') {
      where.status = status.toUpperCase() as any
    }

    const [players, total] = await Promise.all([
      prisma.player.findMany({
        where,
        include: {
          user: {
            select: { name: true, email: true, phoneNumber: true }
          }
        },
        orderBy: { joiningDate: 'desc' },
        skip,
        take: limit
      }),
      prisma.player.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      players,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching players:', error)
    return NextResponse.json(
      { error: 'Failed to fetch players' },
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

    const playerData = await request.json()

    // Create player without user association
    // Manager creates player profiles directly

    // Check if jersey number already exists for the same team
    const existingPlayer = await prisma.player.findFirst({
      where: {
        jerseyNumber: playerData.jerseyNumber,
        team: playerData.team?.toUpperCase() as any
      }
    })

    if (existingPlayer) {
      return NextResponse.json({ error: 'Jersey number already exists for this team' }, { status: 400 })
    }

    const player = await prisma.player.create({
      data: {
        ...playerData,
        position: playerData.position?.toUpperCase() as any,
        preferredFoot: playerData.preferredFoot?.toUpperCase() as any,
        team: playerData.team?.toUpperCase() as any,
        status: playerData.status?.toUpperCase() as any || 'ACTIVE'
      }
    })

    return NextResponse.json(player, { status: 201 })
  } catch (error) {
    console.error('Error creating player:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create player' },
      { status: 500 }
    )
  }
}
