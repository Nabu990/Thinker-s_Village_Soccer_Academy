// Type definitions only — Mongoose models were removed. Use Prisma for runtime DB operations.

export interface IGallery {
  _id: string
  title: string
  description: string
  imageUrl: string
  imagePublicId: string
  category: 'match' | 'training' | 'event' | 'award' | 'facility' | 'team'
  tags: string[]
  uploadedBy: string
  date: Date
  featured: boolean
  likes: number
  views: number
  createdAt: Date
  updatedAt: Date
}

export const Gallery = undefined as unknown as any
