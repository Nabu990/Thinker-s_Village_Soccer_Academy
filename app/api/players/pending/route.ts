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

    // Fetch pending players with user information
    const pendingPlayers = await prisma.player.findMany({
      where: { status: 'PENDING' },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phoneNumber: true,
            address: true,
            dateOfBirth: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ pendingPlayers })
  } catch (error) {
    console.error('Error fetching pending players:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pending players' },
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

    const { playerId, action } = await request.json()

    if (!playerId || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Player ID and action (approve/reject) are required' },
        { status: 400 }
      )
    }

    const player = await prisma.player.findUnique({
      where: { id: playerId },
      include: { user: true }
    })

    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 })
    }

    if (player.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Player is not in pending status' },
        { status: 400 }
      )
    }

    if (action === 'approve') {
      // Update player status to ACTIVE and activate user account
      await prisma.$transaction([
        prisma.player.update({
          where: { id: playerId },
          data: { status: 'ACTIVE' }
        }),
        prisma.user.update({
          where: { id: player.userId },
          data: { isActive: true }
        })
      ])

      return NextResponse.json({ 
        message: 'Player approved successfully',
        player: { ...player, status: 'ACTIVE' }
      })
    } else {
      // Reject player - delete player profile and user account
      await prisma.$transaction([
        prisma.player.delete({
          where: { id: playerId }
        }),
        prisma.user.delete({
          where: { id: player.userId }
        })
      ])

      return NextResponse.json({ 
        message: 'Player registration rejected successfully'
      })
    }
  } catch (error) {
    console.error('Error processing player approval:', error)
    return NextResponse.json(
      { error: 'Failed to process player approval' },
      { status: 500 }
    )
  }
}
