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

    // Fetch all dashboard stats in parallel
    const [
      totalPlayers,
      activeCoaches,
      galleryItems,
      activeTeams
    ] = await Promise.all([
      prisma.player.count({
        where: { status: 'ACTIVE' }
      }),
      prisma.coach.count({
        where: { status: 'ACTIVE' }
      }),
      prisma.gallery.count(),
      prisma.$queryRaw`SELECT COUNT(DISTINCT team) as count FROM players WHERE status = 'ACTIVE'`
    ])

    // Calculate derived stats
    const stats = {
      totalPlayers,
      activeCoaches,
      upcomingMatches: 3, // Mock data - would come from matches table
      galleryItems,
      totalRevenue: 12500, // Mock data - would come from payments table
      activeTeams: Number(activeTeams[0]?.count || 0),
      pendingApprovals: 2, // Mock data - would come from pending registrations
      trainingSessions: 8 // Mock data - would come from training schedule
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
