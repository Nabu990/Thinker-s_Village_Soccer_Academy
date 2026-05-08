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
    if (!payload || payload.role !== 'PLAYER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Since players are no longer linked to users, we need a different approach
    // For now, players will need to be identified by jersey number or other unique field
    // This is a limitation of the new design - players can't access their own profiles
    // without user association
    
    return NextResponse.json({ 
      error: 'Player profiles are not accessible without user association. Players need to be linked to user accounts to access their profiles.' 
    }, { status: 403 })
  } catch (error) {
    console.error('Error fetching player profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch player profile' },
      { status: 500 }
    )
  }
}
