import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth-prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const isPublic = searchParams.get('public') === 'true'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Build query
    const where: any = {}
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search] } }
      ]
    }
    
    if (category && category !== 'all') {
      where.category = category.toUpperCase() as any
    }

    // For public gallery, only show approved items
    if (isPublic) {
      where.featured = true
    }

    const skip = (page - 1) * limit

    const [items, total] = await Promise.all([
      prisma.gallery.findMany({
        where,
        include: {
          uploader: {
            select: { name: true }
          }
        },
        orderBy: { date: 'desc' },
        skip,
        take: limit
      }),
      prisma.gallery.count({ where })
    ])

    return NextResponse.json({
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery items' },
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

    const galleryData = await request.json()

    const galleryItem = await prisma.gallery.create({
      data: {
        ...galleryData,
        category: galleryData.category?.toUpperCase() as any,
        uploadedBy: payload.userId
      },
      include: {
        uploader: {
          select: { name: true }
        }
      }
    })

    return NextResponse.json(galleryItem, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery item:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create gallery item' },
      { status: 500 }
    )
  }
}
